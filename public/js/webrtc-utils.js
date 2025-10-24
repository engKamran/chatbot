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
    this.remoteDescriptionSet = false;
    this.pendingCandidates = [];
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
      console.log('ICE connection state:', this.peerConnection.iceConnectionState);
      console.log('ICE gathering state:', this.peerConnection.iceGatheringState);

      if (this.peerConnection.connectionState === 'failed') {
        console.error('Connection failed - ICE state:', this.peerConnection.iceConnectionState);
        this.onError('Connection failed. Please try again.');
      } else if (this.peerConnection.connectionState === 'connected') {
        console.log('Connection established successfully!');
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
      console.log('Setting remote description (offer)');
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      this.remoteDescriptionSet = true;
      console.log('Remote description set, processing pending ICE candidates:', this.pendingCandidates.length);

      // Process any pending ICE candidates
      for (const candidate of this.pendingCandidates) {
        try {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          console.log('Added pending ICE candidate');
        } catch (error) {
          console.error('Error adding pending ICE candidate:', error);
        }
      }
      this.pendingCandidates = [];

      console.log('Creating answer');
      const answer = await this.peerConnection.createAnswer();
      console.log('Setting local description (answer)');
      await this.peerConnection.setLocalDescription(answer);
      console.log('Sending answer');
      this.socket.emit('webrtc-answer', { answer });
      return answer;
    } catch (error) {
      console.error('Error handling offer:', error);
      this.onError('Error handling offer: ' + error.message);
      throw error;
    }
  }

  async handleAnswer(answer) {
    try {
      console.log('Setting remote description (answer)');
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      this.remoteDescriptionSet = true;
      console.log('Answer set successfully, processing pending ICE candidates:', this.pendingCandidates.length);

      // Process any pending ICE candidates
      for (const candidate of this.pendingCandidates) {
        try {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          console.log('Added pending ICE candidate');
        } catch (error) {
          console.error('Error adding pending ICE candidate:', error);
        }
      }
      this.pendingCandidates = [];
    } catch (error) {
      console.error('Error handling answer:', error);
      this.onError('Error handling answer: ' + error.message);
      throw error;
    }
  }

  async handleIceCandidate(candidate) {
    try {
      if (this.peerConnection && candidate) {
        // Queue candidates if remote description not set yet
        if (!this.remoteDescriptionSet) {
          console.log('Remote description not set yet, queueing ICE candidate');
          this.pendingCandidates.push(candidate);
          return;
        }

        console.log('Adding ICE candidate');
        await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        console.log('ICE candidate added successfully');
      }
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
      // Don't throw - ICE candidate errors are often non-fatal
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

