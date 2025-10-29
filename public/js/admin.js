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
let isFullscreen = false;

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
        console.error('WebRTC Error:', error);
      }
    );

    // Get local media
    try {
      const localStream = await webrtcManager.initialize();
      // Use hidden video element for initialization to ensure stream is active
      const hiddenVideoElement = document.getElementById('localVideoHidden');
      if (hiddenVideoElement) {
        hiddenVideoElement.srcObject = localStream;
        console.log('Local stream initialized on hidden element');
      } else {
        console.error('Hidden video element not found');
      }
    } catch (mediaError) {
      console.error('Media access error:', mediaError);
      alert('Please allow camera access to use the admin dashboard');
    }

    // Connect as admin
    socket.emit('admin-join');
  } catch (error) {
    console.error('Initialization error:', error);
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

  // Update queue count
  const queueCount = document.getElementById('queueCount');
  if (queueCount) {
    queueCount.textContent = data.queueLength;
  }

  // Update next visitor name and show/hide controls
  if (data.visitors && data.visitors.length > 0) {
    document.getElementById('nextVisitorName').textContent = data.visitors[0].name;
    // Show accept/reject buttons only when there are visitors in queue and not streaming
    if (!isStreaming) {
      document.getElementById('queueControlsSection').style.display = 'block';
      document.getElementById('queueSection').style.display = 'block';
    }
  } else {
    document.getElementById('nextVisitorName').textContent = 'Waiting for visitors...';
    // Hide accept/reject buttons when queue is empty
    if (!isStreaming) {
      document.getElementById('queueControlsSection').style.display = 'none';
      document.getElementById('queueSection').style.display = 'none';
    }
  }
});

socket.on('visitor-accepted', (data) => {
  currentVisitor = data.visitorName;
  isStreaming = true;
  document.getElementById('currentVisitorName').textContent = data.visitorName;
  updateStatus('Stream Status', 'Active', 'statusStream');
  updateConnectionStatus('Streaming', 'active');

  // Hide queue controls and show video section
  document.getElementById('queueControlsSection').style.display = 'none';
  document.getElementById('videoSection').style.display = 'block';
  document.getElementById('queueSection').style.display = 'none';
  document.getElementById('endStreamBtn').style.display = 'block';

  // Move stream from hidden element to visible element
  const hiddenVideoElement = document.getElementById('localVideoHidden');
  const visibleVideoElement = document.getElementById('localVideo');
  if (hiddenVideoElement && visibleVideoElement && hiddenVideoElement.srcObject) {
    visibleVideoElement.srcObject = hiddenVideoElement.srcObject;
    console.log('Local stream moved to visible video element');
  }

  // Add message to chat
  addMessageToChat(`🎥 Connected with ${data.visitorName}! Your stream is now LIVE!`, true);

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
    console.log('Admin received offer');
    await webrtcManager.handleOffer(data.offer);
  } catch (error) {
    console.error('Error handling offer:', error);
  }
});

socket.on('webrtc-answer', async (data) => {
  try {
    console.log('Admin received answer');
    await webrtcManager.handleAnswer(data.answer);
  } catch (error) {
    console.error('Error handling answer:', error);
  }
});

socket.on('webrtc-ice-candidate', async (data) => {
  try {
    console.log('Admin received ICE candidate');
    await webrtcManager.handleIceCandidate(data.candidate);
  } catch (error) {
    console.error('Error handling ICE candidate:', error);
  }
});

// Functions
function acceptVisitor() {
  socket.emit('accept-visitor');
  // Initiate WebRTC offer with longer delay to ensure peer connection is ready
  setTimeout(() => {
    console.log('Creating offer for visitor');
    webrtcManager.createOffer().catch(error => {
      console.error('Error creating offer:', error);
    });
    // Start connection timeout (30 seconds)
    webrtcManager.startConnectionTimeout(30000);
  }, 1000);
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

  // Exit fullscreen if active
  if (isFullscreen) {
    toggleFullscreen();
  }

  // Hide video section and show queue controls
  document.getElementById('videoSection').style.display = 'none';
  document.getElementById('endStreamBtn').style.display = 'none';
  document.getElementById('queueControlsSection').style.display = 'block';
  document.getElementById('queueSection').style.display = 'block';

  updateStatus('Stream Status', 'Idle', 'statusStream');
  updateConnectionStatus('Ready to stream', 'active');

  // Add message to chat
  addMessageToChat('👋 Stream ended. Ready for the next visitor!', true);

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

function toggleFullscreen() {
  const container = document.getElementById('fullscreenContainer');
  const fullscreenVideo = document.getElementById('fullscreenVideo');
  const localVideo = document.getElementById('localVideo');

  if (!isFullscreen) {
    // Enter fullscreen
    isFullscreen = true;
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    // Copy video stream to fullscreen video
    if (localVideo && localVideo.srcObject) {
      fullscreenVideo.srcObject = localVideo.srcObject;
    }

    // Try to use browser fullscreen API if available
    if (container.requestFullscreen) {
      container.requestFullscreen().catch(err => {
        console.log('Fullscreen request failed:', err);
      });
    }
  } else {
    // Exit fullscreen
    isFullscreen = false;
    container.style.display = 'none';

    // Exit browser fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
}

function addMessageToChat(text, isAdmin = false) {
  const messagesArea = document.getElementById('messagesArea');
  const messageGroup = document.createElement('div');
  messageGroup.className = `message-group ${isAdmin ? 'user-message' : 'ai-message'}`;

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = isAdmin ? '👨‍💼' : '👤';

  const content = document.createElement('div');
  content.className = 'message-content';

  const paragraph = document.createElement('p');
  paragraph.textContent = text;

  content.appendChild(paragraph);

  if (isAdmin) {
    messageGroup.appendChild(content);
    messageGroup.appendChild(avatar);
  } else {
    messageGroup.appendChild(avatar);
    messageGroup.appendChild(content);
  }

  messagesArea.appendChild(messageGroup);

  // Scroll to bottom
  messagesArea.scrollTop = messagesArea.scrollHeight;
}

function updateConnectionStatus(status, type) {
  const statusText = document.getElementById('statusText');
  const statusDot = document.getElementById('chatboxStatusDot');
  if (statusText) {
    statusText.textContent = status;
  }
  if (statusDot) {
    statusDot.classList.remove('active', 'inactive');
    if (type === 'active') {
      statusDot.classList.add('active');
    }
  }
}

