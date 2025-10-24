# Quick Start Guide

## 5-Minute Setup

### Step 1: Install & Run Locally (2 minutes)

```bash
# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:5000
```

### Step 2: Test Locally (2 minutes)

Open two browser windows:

**Window 1 - Admin:**
- Go to http://localhost:5000/admin.html
- Allow camera/microphone permissions
- Wait for visitors

**Window 2 - Visitor:**
- Go to http://localhost:5000/visitor.html
- Enter your name
- Click "Join Queue"
- Wait for admin to accept

**Back to Window 1 - Admin:**
- Click "Accept" button
- Video stream should start
- Click "End Stream" to finish

### Step 3: Deploy to Vercel (1 minute)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel
```

Your app is now live! You'll get a URL like:
`https://streaming-chatbot.vercel.app`

## Embed on Wix

### Add Visitor Chat to Wix

1. Go to Wix Editor
2. Add → HTML iframe
3. Paste:
```html
<iframe 
  src="https://streaming-chatbot.vercel.app/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
></iframe>
```

### Add Admin Dashboard to Wix

1. Go to Wix Editor
2. Add → HTML iframe
3. Paste:
```html
<iframe 
  src="https://streaming-chatbot.vercel.app/admin.html" 
  width="100%" 
  height="900px" 
  frameborder="0"
  allow="camera; microphone"
></iframe>
```

## How It Works

```
Visitor                          Admin
   |                              |
   |-- Joins Queue ------->       |
   |                              |
   |                         Sees Queue
   |                              |
   |<----- Admin Accepts ------   |
   |                              |
   |<-- WebRTC Stream Starts -->  |
   |                              |
   |<-- Video/Audio Streaming --> |
   |                              |
   |-- End Stream ------->        |
   |                              |
```

## Features

✅ Real-time queue management
✅ Peer-to-peer video streaming
✅ Accept/reject visitors
✅ Responsive design
✅ Works on mobile
✅ Embeddable on Wix
✅ No database needed (demo)

## Troubleshooting

### Camera not working?
- Check browser permissions
- Try a different browser
- Restart browser

### Can't see video?
- Ensure both have camera access
- Check internet connection
- Refresh page

### Connection issues?
- Check if server is running
- Verify HTTPS (for production)
- Check browser console

## Next Steps

1. **Customize**: Edit style.css for branding
2. **Add Auth**: Protect admin page with password
3. **Add Chat**: Implement text messaging
4. **Add Recording**: Record streams
5. **Add AI**: Integrate AI bot for auto-responses

## File Structure

```
├── server.js              # Backend
├── public/
│   ├── admin.html        # Admin page
│   ├── visitor.html      # Visitor page
│   ├── style.css         # Styling
│   └── js/
│       ├── admin.js      # Admin logic
│       ├── visitor.js    # Visitor logic
│       └── webrtc-utils.js # WebRTC
├── package.json
├── vercel.json           # Vercel config
└── README.md
```

## Support

For issues:
1. Check browser console (F12)
2. Check server logs
3. Read README.md
4. Check DEPLOYMENT.md

## Tips

- Use Chrome for best WebRTC support
- Test on mobile before deploying
- Keep video quality reasonable for bandwidth
- Monitor Vercel dashboard for issues

Enjoy! 🚀

