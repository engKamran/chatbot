const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling'],
  pingInterval: 25000,
  pingTimeout: 60000,
  upgradeTimeout: 10000,
  maxHttpBufferSize: 1e6,
  allowEIO3: true
});

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Allow embedding in iframes
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// State management
let adminSocket = null;
let visitorQueue = [];
let activeStream = null;

// Routes
app.get('/', (req, res) => {
  res.send('Streaming Chatbot Server Running');
});

// Serve HTML files explicitly
app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/visitor.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'visitor.html'));
});

// Socket.io events
io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  // Admin connects
  socket.on('admin-join', () => {
    adminSocket = socket;
    console.log('Admin connected:', socket.id);
    socket.emit('admin-status', { 
      status: 'connected',
      queueLength: visitorQueue.length,
      activeStream: activeStream ? true : false
    });
    broadcastQueueUpdate();
  });

  // Visitor joins queue
  socket.on('visitor-join', (data) => {
    const visitor = {
      id: socket.id,
      name: data.name || 'Visitor',
      joinedAt: new Date(),
      socket: socket
    };
    visitorQueue.push(visitor);
    console.log('Visitor joined queue:', visitor.name, '- Queue length:', visitorQueue.length);
    
    socket.emit('queue-position', { position: visitorQueue.length });
    broadcastQueueUpdate();
  });

  // Admin accepts visitor
  socket.on('accept-visitor', () => {
    if (visitorQueue.length > 0) {
      const visitor = visitorQueue.shift();
      activeStream = {
        adminId: socket.id,
        visitorId: visitor.id,
        visitorName: visitor.name,
        startedAt: new Date()
      };

      console.log('Admin accepted visitor:', visitor.name);

      // Notify visitor they're accepted
      visitor.socket.emit('stream-accepted');

      // Notify admin
      socket.emit('visitor-accepted', { visitorName: visitor.name });

      broadcastQueueUpdate();
    }
  });

  // Admin ready signal
  socket.on('admin-ready', (data) => {
    if (activeStream && activeStream.visitorId) {
      io.to(activeStream.visitorId).emit('admin-ready', data);
      console.log('Admin ready signal sent to visitor');
    }
  });

  // Admin rejects visitor
  socket.on('reject-visitor', () => {
    if (visitorQueue.length > 0) {
      const visitor = visitorQueue.shift();
      console.log('Admin rejected visitor:', visitor.name);
      visitor.socket.emit('stream-rejected');
      broadcastQueueUpdate();
    }
  });

  // WebRTC signaling - offer
  socket.on('webrtc-offer', (data) => {
    if (activeStream) {
      const targetId = activeStream.visitorId === socket.id ? activeStream.adminId : activeStream.visitorId;
      io.to(targetId).emit('webrtc-offer', data);
    }
  });

  // WebRTC signaling - answer
  socket.on('webrtc-answer', (data) => {
    if (activeStream) {
      const targetId = activeStream.visitorId === socket.id ? activeStream.adminId : activeStream.visitorId;
      io.to(targetId).emit('webrtc-answer', data);
    }
  });

  // WebRTC signaling - ICE candidate
  socket.on('webrtc-ice-candidate', (data) => {
    if (activeStream) {
      const targetId = activeStream.visitorId === socket.id ? activeStream.adminId : activeStream.visitorId;
      io.to(targetId).emit('webrtc-ice-candidate', data);
    }
  });

  // Stream ended
  socket.on('stream-ended', () => {
    console.log('Stream ended');
    activeStream = null;
    
    // Notify both parties
    if (adminSocket) {
      adminSocket.emit('stream-ended');
    }
    
    broadcastQueueUpdate();
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // If admin disconnects
    if (adminSocket && adminSocket.id === socket.id) {
      adminSocket = null;
      if (activeStream) {
        io.to(activeStream.visitorId).emit('stream-ended');
        activeStream = null;
      }
    }
    
    // If visitor disconnects
    visitorQueue = visitorQueue.filter(v => v.id !== socket.id);
    
    if (activeStream && (activeStream.adminId === socket.id || activeStream.visitorId === socket.id)) {
      activeStream = null;
      if (adminSocket) {
        adminSocket.emit('stream-ended');
      }
    }
    
    broadcastQueueUpdate();
  });
});

// Helper function to broadcast queue updates
function broadcastQueueUpdate() {
  io.emit('queue-update', {
    queueLength: visitorQueue.length,
    visitors: visitorQueue.map(v => ({ name: v.name })),
    activeStream: activeStream ? true : false,
    adminConnected: adminSocket ? true : false
  });
}

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

