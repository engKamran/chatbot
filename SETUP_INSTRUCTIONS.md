# Complete Setup Instructions

## What You Have

A fully functional streaming chatbot application with:
- ✅ Backend server (Node.js + Express + Socket.io)
- ✅ Admin dashboard for managing visitors
- ✅ Visitor queue page
- ✅ WebRTC peer-to-peer video streaming
- ✅ Real-time queue updates
- ✅ Responsive design
- ✅ Ready for Vercel deployment
- ✅ Embeddable on Wix

## Project Files

```
streaming-chatbot/
├── server.js                    # Main backend server
├── package.json                 # Dependencies
├── vercel.json                  # Vercel configuration
├── public/
│   ├── admin.html              # Admin dashboard
│   ├── visitor.html            # Visitor queue page
│   ├── style.css               # Shared styling
│   └── js/
│       ├── admin.js            # Admin client logic
│       ├── visitor.js          # Visitor client logic
│       └── webrtc-utils.js     # WebRTC utilities
├── README.md                    # Project overview
├── QUICKSTART.md               # Quick start guide
├── DEPLOYMENT.md               # Deployment guide
└── SETUP_INSTRUCTIONS.md       # This file
```

## Step 1: Local Testing

### Prerequisites
- Node.js 18+ installed
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)
- Webcam and microphone

### Run Locally

```bash
# Navigate to project directory
cd "Chatbot for stream"

# Install dependencies (already done)
npm install

# Start server
npm start

# Output: Server running on port 5000
```

### Test in Browser

**Terminal 1 - Admin:**
```
http://localhost:5000/admin.html
```

**Terminal 2 - Visitor:**
```
http://localhost:5000/visitor.html
```

### Test Flow

1. **Admin Page:**
   - Opens admin.html
   - Allows camera/microphone
   - Sees "Waiting for visitors..."

2. **Visitor Page:**
   - Opens visitor.html
   - Enters name (e.g., "John")
   - Clicks "Join Queue"
   - Sees position in queue

3. **Admin Page:**
   - Sees visitor in queue
   - Clicks "Accept" button
   - WebRTC connection initiates

4. **Both Pages:**
   - Video streams appear
   - Can see and hear each other
   - Click "End Stream" to disconnect

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI (Easiest)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel (creates account if needed)
vercel login

# Deploy from project directory
vercel

# Follow prompts:
# - Confirm project name
# - Confirm root directory
# - Confirm build settings
# - Wait for deployment
```

**Result:** You'll get a URL like `https://streaming-chatbot.vercel.app`

### Option B: Using GitHub

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/streaming-chatbot.git
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - Click Import
   - Click Deploy

**Result:** Automatic deployments on every push

## Step 3: Test Deployed App

```
Admin: https://your-app.vercel.app/admin.html
Visitor: https://your-app.vercel.app/visitor.html
```

Test the same flow as local testing.

## Step 4: Embed on Wix

### For Visitor Chat Widget

1. Go to your Wix site editor
2. Click "Add" → "HTML iframe"
3. Paste this code:

```html
<iframe 
  src="https://your-app.vercel.app/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

4. Adjust height as needed
5. Publish your site

### For Admin Dashboard

1. Create a private page on Wix (e.g., /admin)
2. Add HTML iframe element
3. Paste this code:

```html
<iframe 
  src="https://your-app.vercel.app/admin.html" 
  width="100%" 
  height="900px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

4. Restrict access to admin only
5. Publish

## Customization

### Change Colors

Edit `public/style.css`:
```css
/* Change primary color */
.btn-primary {
  background: #YOUR_COLOR;
}

/* Change gradient background */
body {
  background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Change Port

Edit `server.js`:
```javascript
const PORT = process.env.PORT || 5000; // Change 5000 to your port
```

### Add Authentication

Edit `server.js` to add admin password:
```javascript
socket.on('admin-join', (data) => {
  if (data.password === 'your-password') {
    adminSocket = socket;
    // ... rest of code
  }
});
```

## Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>
```

### Camera Permission Denied
- Check browser settings
- Allow camera access
- Try incognito mode
- Try different browser

### WebRTC Not Working
- Ensure HTTPS (Vercel provides this)
- Check firewall settings
- Try different network
- Check browser console for errors

### Socket.io Connection Failed
- Verify server is running
- Check network connection
- Verify correct URL
- Check browser console

## Performance Tips

1. **Video Quality:** Adjust in `public/js/webrtc-utils.js`
2. **Bandwidth:** Reduce video resolution for slower connections
3. **Latency:** Use STUN servers closer to your region
4. **Scaling:** For multiple admins, modify queue logic in `server.js`

## Security Notes

For production:
1. Add authentication to admin page
2. Implement rate limiting
3. Add CORS restrictions
4. Validate all socket events
5. Use environment variables for secrets
6. Add HTTPS (Vercel does this automatically)

## Next Steps

1. ✅ Test locally
2. ✅ Deploy to Vercel
3. ✅ Embed on Wix
4. 📝 Add authentication
5. 📝 Add chat messaging
6. 📝 Add recording
7. 📝 Integrate AI bot

## Support Resources

- **README.md** - Project overview
- **QUICKSTART.md** - 5-minute setup
- **DEPLOYMENT.md** - Detailed deployment guide
- **Browser Console** - Debug errors (F12)
- **Vercel Dashboard** - Monitor deployment

## Success Checklist

- [ ] npm install completed
- [ ] npm start runs without errors
- [ ] Admin page loads at localhost:5000/admin.html
- [ ] Visitor page loads at localhost:5000/visitor.html
- [ ] Camera/microphone permissions work
- [ ] Can join queue as visitor
- [ ] Can accept visitor as admin
- [ ] Video streams work
- [ ] Deployed to Vercel
- [ ] Embedded on Wix
- [ ] Tested on mobile

## You're All Set! 🎉

Your streaming chatbot is ready to use. Start with local testing, then deploy to Vercel, and finally embed on your Wix site.

For questions, check the documentation files or browser console for errors.

