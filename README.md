# Streaming Chatbot Demo

A simple live streaming chatbot application that allows visitors to queue up and stream with an admin when available. Built with vanilla JavaScript, Node.js, Express, Socket.io, and WebRTC.

## Features

- ✅ Admin dashboard for managing visitor queue
- ✅ Visitor queue system (FIFO)
- ✅ Live peer-to-peer video streaming using WebRTC
- ✅ Real-time queue updates via WebSocket
- ✅ Accept/Reject visitor requests
- ✅ Responsive design
- ✅ Embeddable on Wix using iframes

## Project Structure

```
.
├── server.js                 # Express + Socket.io backend
├── package.json             # Dependencies
├── public/
│   ├── admin.html          # Admin dashboard
│   ├── visitor.html        # Visitor queue page
│   ├── style.css           # Shared styling
│   └── js/
│       ├── admin.js        # Admin client logic
│       ├── visitor.js      # Visitor client logic
│       └── webrtc-utils.js # WebRTC utilities
└── README.md
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open in browser:
   - Admin: http://localhost:3000/admin.html
   - Visitor: http://localhost:3000/visitor.html

## How It Works

### Admin Flow
1. Admin opens admin.html
2. Admin connects to server
3. Admin sees visitor queue
4. Admin accepts/rejects visitors
5. When accepted, WebRTC stream starts
6. Admin can end stream anytime

### Visitor Flow
1. Visitor opens visitor.html
2. Visitor enters name and joins queue
3. Visitor waits for admin to accept
4. When accepted, WebRTC stream starts
5. Visitor can end stream anytime

### Queue Management
- Visitors join queue in FIFO order
- Only one visitor can stream at a time
- Admin can accept or reject visitors
- Queue updates in real-time for all connected clients

## Embedding on Wix

To embed on Wix, use the HTML iframe element:

```html
<iframe 
  src="https://your-app-url.vercel.app/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
></iframe>
```

For admin page:
```html
<iframe 
  src="https://your-app-url.vercel.app/admin.html" 
  width="100%" 
  height="900px" 
  frameborder="0"
  allow="camera; microphone"
></iframe>
```

## Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables if needed
4. Deploy

Vercel will automatically detect Node.js and deploy the app.

## Technologies Used

- **Backend**: Node.js, Express, Socket.io
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Real-time Communication**: WebSocket (Socket.io)
- **Video Streaming**: WebRTC
- **Hosting**: Vercel

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- Mobile browsers with WebRTC support

## Notes

- HTTPS is required for WebRTC (Vercel provides this automatically)
- Camera and microphone permissions are required
- Only one admin can be connected at a time
- Multiple visitors can be in queue

## Future Enhancements

- Multiple admins support
- Chat messaging
- Screen sharing
- Recording functionality
- User authentication
- Database for history
- AI bot integration

## License

MIT

