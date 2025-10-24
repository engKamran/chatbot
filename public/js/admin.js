// Admin Client Logic
// Note: Vercel doesn't support long-lived connections
// For production, use Railway, Render, Heroku, or DigitalOcean
const socket = io({
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  transports: ['websocket'],  // WebSocket only
  upgrade: false
});
let webrtcManager = null;
let isStreaming = false;
let currentVisitor = null;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize WebRTC
    webrtcManager = new WebRTCManager(
      socket,
      (remoteStream) => {
        console.log('Remote stream received');
        const remoteVideo = document.getElementById('remoteVideo');
        if (remoteVideo) {
          remoteVideo.srcObject = remoteStream;
        }
      },
      (error) => {
        showMessage(error, 'error');
      }
    );

    // Get local media
    const localStream = await webrtcManager.initialize();
    const videoElement = document.getElementById('localVideo');
    videoElement.srcObject = localStream;

    // Connect as admin
    socket.emit('admin-join');
  } catch (error) {
    showMessage('Failed to initialize: ' + error.message, 'error');
  }
});

// Connection events
socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
  updateStatus('Admin Status', 'Connected', 'statusAdmin');
  socket.emit('admin-join');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  updateStatus('Admin Status', 'Disconnected', 'statusAdmin');
});

socket.on('connect_error', (error) => {
  console.error('Connection error:', error);
  showMessage('Connection error: ' + error.message, 'error');
});

socket.on('reconnect_attempt', () => {
  console.log('Attempting to reconnect...');
  showMessage('Reconnecting...', 'info');
});

socket.on('reconnect', () => {
  console.log('Reconnected to server');
  showMessage('Reconnected!', 'success');
  socket.emit('admin-join');
});

// Socket events
socket.on('admin-status', (data) => {
  updateStatus('Admin Status', data.status === 'connected' ? 'Connected' : 'Disconnected', 'statusAdmin');
  updateQueueDisplay(data.queueLength);
});

socket.on('queue-update', (data) => {
  updateStatus('Queue Length', data.queueLength.toString(), 'statusQueue');
  updateQueueList(data.visitors);

  // Update next visitor name
  if (data.visitors && data.visitors.length > 0) {
    document.getElementById('nextVisitorName').textContent = data.visitors[0].name;
  } else {
    document.getElementById('nextVisitorName').textContent = 'Waiting for visitors...';
  }

  if (data.queueLength > 0 && !isStreaming) {
    document.getElementById('queueControlsSection').style.display = 'block';
  } else if (data.queueLength === 0 && !isStreaming) {
    document.getElementById('queueControlsSection').style.display = 'block';
  }
});

socket.on('visitor-accepted', (data) => {
  currentVisitor = data.visitorName;
  isStreaming = true;
  document.getElementById('currentVisitorName').textContent = data.visitorName;
  updateStatus('Stream Status', 'Active', 'statusStream');

  // Hide queue controls and show video section
  document.getElementById('queueControlsSection').style.display = 'none';
  document.getElementById('videoSection').style.display = 'block';
  document.getElementById('queueSection').style.display = 'none';

  showMessage('Connected with ' + data.visitorName + '! Starting stream...', 'success');

  // Notify visitor that admin is ready
  setTimeout(() => {
    socket.emit('admin-ready', { adminName: 'Admin' });
  }, 500);
});

socket.on('stream-ended', () => {
  endStream();
});

socket.on('webrtc-offer', async (data) => {
  try {
    await webrtcManager.handleOffer(data.offer);
  } catch (error) {
    console.error('Error handling offer:', error);
  }
});

socket.on('webrtc-answer', async (data) => {
  try {
    await webrtcManager.handleAnswer(data.answer);
  } catch (error) {
    console.error('Error handling answer:', error);
  }
});

socket.on('webrtc-ice-candidate', async (data) => {
  try {
    await webrtcManager.handleIceCandidate(data.candidate);
  } catch (error) {
    console.error('Error handling ICE candidate:', error);
  }
});

// Functions
function acceptVisitor() {
  socket.emit('accept-visitor');
  // Initiate WebRTC offer
  setTimeout(() => {
    webrtcManager.createOffer().catch(error => {
      console.error('Error creating offer:', error);
    });
  }, 500);
}

function rejectVisitor() {
  socket.emit('reject-visitor');
  showMessage('Visitor rejected', 'info');
}

function endStream() {
  if (webrtcManager) {
    webrtcManager.stop();
  }
  socket.emit('stream-ended');
  isStreaming = false;
  currentVisitor = null;

  // Hide video section and show queue controls
  document.getElementById('videoSection').style.display = 'none';
  document.getElementById('queueControlsSection').style.display = 'block';
  document.getElementById('queueSection').style.display = 'block';

  updateStatus('Stream Status', 'Idle', 'statusStream');
  showMessage('Stream ended. Ready for next visitor!', 'info');

  // Reinitialize for next stream
  setTimeout(() => {
    location.reload();
  }, 1500);
}

function updateStatus(label, value, elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    // For status indicators, keep the dot
    if (elementId === 'statusAdmin' || elementId === 'statusStream') {
      if (value === 'Connected' || value === 'Active') {
        element.classList.add('active');
        element.classList.remove('inactive');
      } else if (value === 'Disconnected' || value === 'Idle') {
        element.classList.add('inactive');
        element.classList.remove('active');
      }
    } else {
      // For queue length, show the number
      element.querySelector('.value').textContent = value;
    }
  }
}

function updateQueueDisplay(length) {
  const element = document.getElementById('statusQueue');
  if (element) {
    element.querySelector('.value').textContent = length;
  }
}

function updateQueueList(visitors) {
  const queueList = document.getElementById('queueList');
  if (visitors.length === 0) {
    queueList.innerHTML = '<li class="queue-item" style="color: #999;">No visitors in queue</li>';
  } else {
    queueList.innerHTML = visitors.map((visitor, index) => `
      <li class="queue-item">
        <span class="queue-item-name">${visitor.name}</span>
        <span class="queue-item-position">#${index + 1}</span>
      </li>
    `).join('');
  }
}

function showMessage(message, type = 'info') {
  const messageBox = document.getElementById('messageBox');
  const messageEl = document.createElement('div');
  messageEl.className = `message ${type}`;
  messageEl.textContent = message;
  messageBox.appendChild(messageEl);
  
  setTimeout(() => {
    messageEl.remove();
  }, 5000);
}

