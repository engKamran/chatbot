// Visitor Client Logic
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
let isInQueue = false;
let isStreaming = false;
let visitorName = 'Visitor';

// AI Dummy responses
const aiResponses = [
  "Thanks for reaching out! How can I help you today? 😊",
  "I'm here to assist you. What do you need?",
  "Great question! Let me help you with that. 💡",
  "I understand. Can you tell me more about your issue?",
  "That's a common question. I can definitely help with that!",
  "I'm processing your request. Please wait a moment. ⏳",
  "Thanks for your patience. An admin will be with you shortly.",
  "Is there anything else I can help you with?",
  "I appreciate your feedback. An admin can help with more complex issues.",
  "You're welcome! Feel free to ask if you need anything else. 👍",
  "That's interesting! Tell me more about that.",
  "I'm happy to help! What would you like to know?",
  "Great! I'm here to make your experience better. 🎯",
  "Feel free to ask me anything while you wait for the admin!",
  "I'm always here to chat and help! What's on your mind?"
];

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
  document.getElementById('waitingSection').style.display = 'flex';
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
  document.getElementById('leaveStreamBtn').style.display = 'block';

  // Add admin accepted message
  addMessageToChat('🎉 You\'re connected! The admin\'s LIVE STREAM is loading below. Enjoy the broadcast!', false);

  // Show loading screen
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.display = 'flex';
  }

  try {
    // Initialize WebRTC - RECEIVE ONLY (no local media)
    webrtcManager = new WebRTCManager(
      socket,
      (remoteStream) => {
        const remoteVideo = document.getElementById('remoteVideo');
        remoteVideo.srcObject = remoteStream;

        // Hide loading screen when video starts playing
        remoteVideo.onloadedmetadata = () => {
          const loadingScreen = document.getElementById('loadingScreen');
          if (loadingScreen) {
            loadingScreen.style.display = 'none';
          }
          console.log('Admin stream loaded and playing');
        };
      },
      (error) => {
        console.error('WebRTC Error:', error);
      }
    );

    // Initialize WebRTC WITHOUT getting local media (receive only)
    await webrtcManager.initializeReceiveOnly();

    // Start connection timeout (30 seconds)
    webrtcManager.startConnectionTimeout(30000);

    // Wait for admin to send offer
    console.log('Waiting for admin to start streaming...');
  } catch (error) {
    console.error('Stream connection error:', error);
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.innerHTML = '<div style="text-align: center; color: white;"><p>Failed to connect to stream</p></div>';
    }
    setTimeout(() => {
      endStream();
    }, 2000);
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
  document.getElementById('rejectedSection').style.display = 'flex';
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

  visitorName = name;

  // Hide join section and show waiting section
  document.getElementById('joinQueueSection').style.display = 'none';
  document.getElementById('waitingSection').style.display = 'block';

  // Add greeting message
  addMessageToChat(`Hi ${name}! 👋 You've joined the queue. The admin is LIVE RIGHT NOW and will accept your request shortly. You'll be able to watch their live stream once accepted!`, false);

  // Add chat suggestion
  setTimeout(() => {
    addMessageToChat(`💬 While you wait, feel free to ask me anything! I'm here to help with quick questions or just chat.`, false);
  }, 1000);

  socket.emit('visitor-join', { name });
  showMessage('Joined queue as ' + name, 'success');
}

function leaveQueue() {
  isInQueue = false;
  socket.disconnect();
  document.getElementById('waitingSection').style.display = 'none';
  document.getElementById('joinQueueSection').style.display = 'flex';
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
  document.getElementById('leaveStreamBtn').style.display = 'none';
  document.getElementById('joinQueueSection').style.display = 'block';

  addMessageToChat('👋 The LIVE STREAM has ended. Thank you for watching! Feel free to join again when the admin goes live next time.', false);
  showMessage('Stream ended', 'info');

  setTimeout(() => {
    location.reload();
  }, 2000);
}

function rejoinQueue() {
  document.getElementById('rejectedSection').style.display = 'none';
  document.getElementById('joinQueueSection').style.display = 'flex';
  showMessage('You can try joining again', 'info');
}

function updateStatus(label, value, elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.querySelector('.value').textContent = value;
  }
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

function updateAdminStatus(status, type) {
  // Status is now shown in the header
  const statusText = document.getElementById('chatboxStatus');
  if (statusText && type === 'active') {
    statusText.textContent = 'Admin online';
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

// Chat Functions
function addMessageToChat(text, isUser = false) {
  const messagesArea = document.getElementById('messagesArea');
  const messageGroup = document.createElement('div');
  messageGroup.className = `message-group ${isUser ? 'user-message' : 'ai-message'}`;

  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = isUser ? '👤' : '🤖';

  const content = document.createElement('div');
  content.className = 'message-content';

  const paragraph = document.createElement('p');
  paragraph.textContent = text;

  content.appendChild(paragraph);

  if (isUser) {
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

function sendMessage() {
  const input = document.getElementById('messageInput');
  const text = input.value.trim();

  if (!text) return;

  // Add user message
  addMessageToChat(text, true);
  input.value = '';

  // Send to server if streaming
  if (isStreaming) {
    socket.emit('visitor-message', { message: text });
  }

  // Get AI response after a short delay
  setTimeout(() => {
    const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
    addMessageToChat(randomResponse, false);
  }, 500 + Math.random() * 1000);
}

function handleMessageKeypress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
}

