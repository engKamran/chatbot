// Visitor Client Logic
const socket = io({
  reconnection: true,
  reconnectionDelay: 500,
  reconnectionDelayMax: 3000,
  reconnectionAttempts: 10,
  transports: ['polling', 'websocket'],  // polling first for Vercel
  upgrade: true,
  rememberUpgrade: true
});
let webrtcManager = null;
let isInQueue = false;
let isStreaming = false;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateConnectionStatus('Connecting...', 'inactive');
  updateAdminStatus('Checking...', 'inactive');
});

// Socket events
socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
  updateConnectionStatus('Connected', 'active');
  showMessage('Connected to server!', 'success');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  updateConnectionStatus('Disconnected', 'inactive');
  showMessage('Disconnected from server', 'error');
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
});

socket.on('queue-position', (data) => {
  isInQueue = true;
  document.getElementById('joinQueueSection').style.display = 'none';
  document.getElementById('waitingSection').style.display = 'block';
  document.getElementById('queuePos').textContent = data.position;
  updateStatus('Queue Position', data.position.toString(), 'statusPosition');
});

socket.on('queue-update', (data) => {
  updateAdminStatus(data.adminConnected ? 'Yes' : 'No', data.adminConnected ? 'active' : 'inactive');
  updateQueueStatus(data);
});

socket.on('stream-accepted', async () => {
  isStreaming = true;
  document.getElementById('waitingSection').style.display = 'none';
  document.getElementById('streamSection').style.display = 'block';
  showMessage('Admin is now live! Connecting to stream...', 'success');

  try {
    // Initialize WebRTC - RECEIVE ONLY (no local media)
    webrtcManager = new WebRTCManager(
      socket,
      (remoteStream) => {
        const remoteVideo = document.getElementById('remoteVideo');
        remoteVideo.srcObject = remoteStream;
        showMessage('Connected to Admin Live Stream! 📹', 'success');
      },
      (error) => {
        showMessage(error, 'error');
      }
    );

    // Initialize WebRTC WITHOUT getting local media (receive only)
    await webrtcManager.initializeReceiveOnly();

    // Wait for admin to send offer
    console.log('Waiting for admin to start streaming...');
  } catch (error) {
    showMessage('Failed to connect to stream: ' + error.message, 'error');
    endStream();
  }
});

socket.on('admin-ready', (data) => {
  // Hide the connecting indicator
  const indicator = document.getElementById('adminConnectingIndicator');
  if (indicator) {
    indicator.style.display = 'none';
  }
  showMessage('Admin is ready! 👨‍💼', 'success');
});

socket.on('stream-rejected', () => {
  isInQueue = false;
  document.getElementById('waitingSection').style.display = 'none';
  document.getElementById('rejectedSection').style.display = 'block';
  showMessage('Your request was rejected', 'error');
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
function joinQueue() {
  const name = document.getElementById('visitorName').value.trim();
  if (!name) {
    showMessage('Please enter your name', 'error');
    return;
  }
  
  socket.emit('visitor-join', { name });
  showMessage('Joined queue as ' + name, 'success');
}

function leaveQueue() {
  isInQueue = false;
  socket.disconnect();
  document.getElementById('waitingSection').style.display = 'none';
  document.getElementById('joinQueueSection').style.display = 'block';
  showMessage('Left the queue', 'info');
  setTimeout(() => {
    location.reload();
  }, 1000);
}

function endStream() {
  if (webrtcManager) {
    webrtcManager.stop();
  }
  socket.emit('stream-ended');
  isStreaming = false;
  
  document.getElementById('streamSection').style.display = 'none';
  document.getElementById('joinQueueSection').style.display = 'block';
  showMessage('Stream ended', 'info');
  
  setTimeout(() => {
    location.reload();
  }, 1000);
}

function rejoinQueue() {
  document.getElementById('rejectedSection').style.display = 'none';
  document.getElementById('joinQueueSection').style.display = 'block';
  showMessage('You can try joining again', 'info');
}

function updateStatus(label, value, elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.querySelector('.value').textContent = value;
  }
}

function updateConnectionStatus(status, type) {
  updateStatus('Connection', status, 'statusConnection');
  const element = document.getElementById('statusConnection');
  if (element) {
    element.classList.remove('active', 'inactive');
    element.classList.add(type);
  }
}

function updateAdminStatus(status, type) {
  updateStatus('Admin Available', status, 'statusAdmin');
  const element = document.getElementById('statusAdmin');
  if (element) {
    element.classList.remove('active', 'inactive');
    element.classList.add(type);
  }
}

function updateQueueStatus(data) {
  const queueStatus = document.getElementById('queueStatus');
  if (queueStatus) {
    queueStatus.innerHTML = `
      <p><strong>Total in queue:</strong> ${data.queueLength}</p>
      <p><strong>Admin connected:</strong> ${data.adminConnected ? '✓ Yes' : '✗ No'}</p>
      <p><strong>Stream active:</strong> ${data.activeStream ? '✓ Yes' : '✗ No'}</p>
    `;
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

