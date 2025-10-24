// WebRTC Configuration
const RTCConfig = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' }
  ]
};

class WebRTCManager {
  constructor(socket, onRemoteStream, onError) {
    this.socket = socket;
    this.onRemoteStream = onRemoteStream;
    this.onError = onError;
    this.peerConnection = null;
    this.localStream = null;
    this.remoteStream = null;
  }

  async initialize() {
    try {
      // Get local media stream
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      });
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      this.onError('Unable to access camera/microphone. Please check permissions.');
      throw error;
    }
  }

  async initializeReceiveOnly() {
    try {
      // For receive-only mode, we don't need local media
      // Just create the peer connection for receiving
      this.peerConnection = this.createPeerConnection();
      console.log('Receive-only mode initialized - ready to receive stream');
      return null;
    } catch (error) {
      console.error('Error initializing receive-only mode:', error);
      this.onError('Failed to initialize receive mode');
      throw error;
    }
  }

  createPeerConnection() {
    this.peerConnection = new RTCPeerConnection({ iceServers: RTCConfig.iceServers });

    // Add local stream tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });
    }

    // Handle remote stream
    this.peerConnection.ontrack = (event) => {
      console.log('Remote track received:', event.track.kind);
      if (!this.remoteStream) {
        this.remoteStream = new MediaStream();
      }
      this.remoteStream.addTrack(event.track);
      this.onRemoteStream(this.remoteStream);
    };

    // Handle ICE candidates
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('webrtc-ice-candidate', {
          candidate: event.candidate
        });
      }
    };

    // Handle connection state changes
    this.peerConnection.onconnectionstatechange = () => {
      console.log('Connection state:', this.peerConnection.connectionState);
      if (this.peerConnection.connectionState === 'failed') {
        this.onError('Connection failed. Please try again.');
      }
    };

    return this.peerConnection;
  }

  async createOffer() {
    try {
      this.createPeerConnection();
      const offer = await this.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      await this.peerConnection.setLocalDescription(offer);
      this.socket.emit('webrtc-offer', { offer });
      return offer;
    } catch (error) {
      console.error('Error creating offer:', error);
      this.onError('Error creating offer');
      throw error;
    }
  }

  async handleOffer(offer) {
    try {
      if (!this.peerConnection) {
        this.createPeerConnection();
      }
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.socket.emit('webrtc-answer', { answer });
      return answer;
    } catch (error) {
      console.error('Error handling offer:', error);
      this.onError('Error handling offer');
      throw error;
    }
  }

  async handleAnswer(answer) {
    try {
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    } catch (error) {
      console.error('Error handling answer:', error);
      this.onError('Error handling answer');
      throw error;
    }
  }

  async handleIceCandidate(candidate) {
    try {
      if (this.peerConnection && candidate) {
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  }

  stop() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
    this.remoteStream = null;
  }

  getLocalStream() {
    return this.localStream;
  }

  getRemoteStream() {
    return this.remoteStream;
  }
}

