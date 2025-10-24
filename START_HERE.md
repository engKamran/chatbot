# 🚀 START HERE - Streaming Chatbot Setup

Welcome! Your streaming chatbot application is ready. Follow these steps to get started.

## 📋 What You Have

A complete streaming chatbot system with:
- ✅ Admin dashboard for managing visitors
- ✅ Visitor queue page
- ✅ Live peer-to-peer video streaming
- ✅ Real-time queue management
- ✅ Ready to deploy on Vercel
- ✅ Embeddable on Wix

## ⚡ Quick Start (5 minutes)

### Step 1: Test Locally (2 minutes)

```bash
# Install dependencies (if not already done)
npm install

# Start the server
npm start

# You should see: "Server running on port 5000"
```

### Step 2: Open in Browser (1 minute)

Open **two browser windows**:

**Window 1 - Admin Dashboard:**
```
http://localhost:5000/admin.html
```

**Window 2 - Visitor Page:**
```
http://localhost:5000/visitor.html
```

### Step 3: Test the Flow (2 minutes)

1. **In Visitor Window:**
   - Enter your name
   - Click "Join Queue"
   - Wait for admin

2. **In Admin Window:**
   - You'll see the visitor in queue
   - Click "Accept" button
   - Video stream should start

3. **Both Windows:**
   - You should see video from each other
   - Click "End Stream" to finish

**Congratulations! It works! 🎉**

## 🌐 Deploy to Vercel (1 minute)

### Option A: Using Vercel CLI (Easiest)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and wait for deployment
```

You'll get a URL like: `https://streaming-chatbot.vercel.app`

### Option B: Using GitHub

1. Push to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Click Deploy

## 📱 Embed on Wix

### Add Visitor Chat to Your Wix Site

1. Go to your Wix site editor
2. Click "Add" → "HTML iframe"
3. Paste this code:

```html
<iframe 
  src="https://YOUR_VERCEL_URL.vercel.app/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

Replace `YOUR_VERCEL_URL` with your actual Vercel URL.

4. Adjust height if needed
5. Publish your site

### Add Admin Dashboard (Optional)

Create a private admin page:

1. Create new page on Wix (e.g., /admin)
2. Add HTML iframe element
3. Paste:

```html
<iframe 
  src="https://YOUR_VERCEL_URL.vercel.app/admin.html" 
  width="100%" 
  height="900px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

4. Restrict access to admin only
5. Publish

## 📚 Documentation

Read these files for more information:

| File | Purpose |
|------|---------|
| **QUICKSTART.md** | 5-minute setup guide |
| **README.md** | Project overview |
| **DEPLOYMENT.md** | Detailed deployment guide |
| **SETUP_INSTRUCTIONS.md** | Complete setup walkthrough |
| **TROUBLESHOOTING.md** | Common issues and solutions |
| **PROJECT_SUMMARY.md** | Project overview and features |
| **CHECKLIST.md** | Implementation checklist |

## 🎯 Next Steps

### Immediate (Do Now)
1. ✅ Test locally
2. ✅ Deploy to Vercel
3. ✅ Embed on Wix

### Soon (Optional)
- Add authentication to admin page
- Add chat messaging
- Customize colors and styling
- Test on mobile devices

### Later (Future Enhancements)
- Add screen sharing
- Add recording functionality
- Integrate AI bot
- Add multiple admins support

## 🔧 Customization

### Change Colors

Edit `public/style.css`:

```css
/* Change primary color */
.btn-primary {
  background: #YOUR_COLOR;
}

/* Change background gradient */
body {
  background: linear-gradient(135deg, #COLOR1 0%, #COLOR2 100%);
}
```

### Change Port

Edit `server.js`:

```javascript
const PORT = process.env.PORT || 5000; // Change 5000 to your port
```

## 🐛 Troubleshooting

### Camera not working?
- Check browser permissions
- Try different browser
- Restart browser

### Can't see video?
- Ensure both have camera access
- Check internet connection
- Refresh page

### Connection issues?
- Check if server is running
- Verify HTTPS (for production)
- Check browser console (F12)

**See TROUBLESHOOTING.md for more help**

## 📊 Project Structure

```
streaming-chatbot/
├── server.js                 # Backend
├── package.json             # Dependencies
├── vercel.json              # Vercel config
├── public/
│   ├── admin.html          # Admin page
│   ├── visitor.html        # Visitor page
│   ├── style.css           # Styling
│   └── js/
│       ├── admin.js        # Admin logic
│       ├── visitor.js      # Visitor logic
│       └── webrtc-utils.js # WebRTC
└── Documentation/
    ├── README.md
    ├── QUICKSTART.md
    ├── DEPLOYMENT.md
    ├── SETUP_INSTRUCTIONS.md
    ├── TROUBLESHOOTING.md
    ├── PROJECT_SUMMARY.md
    ├── CHECKLIST.md
    └── START_HERE.md (this file)
```

## ✨ Features

- **Queue Management**: FIFO queue system
- **Live Streaming**: Peer-to-peer video/audio
- **Real-time Updates**: WebSocket notifications
- **Admin Controls**: Accept/reject visitors
- **Responsive Design**: Works on desktop and mobile
- **Embeddable**: Ready for Wix
- **Production Ready**: Deployed on Vercel with HTTPS

## 🎓 How It Works

```
Visitor joins queue
        ↓
Admin sees visitor
        ↓
Admin accepts
        ↓
WebRTC connection starts
        ↓
Video/audio streams
        ↓
Either party ends
        ↓
Next visitor can join
```

## 💡 Tips

1. **Test Locally First**: Always test locally before deploying
2. **Use Chrome**: Best WebRTC support
3. **Check Console**: F12 for error messages
4. **Monitor Vercel**: Check dashboard for issues
5. **Mobile Testing**: Test on mobile devices

## 🎉 You're All Set!

Your streaming chatbot is ready to use. Start with local testing, deploy to Vercel, and embed on your Wix site.

## 📞 Need Help?

1. Check **TROUBLESHOOTING.md** for common issues
2. Check browser console (F12) for errors
3. Read the documentation files
4. Check Vercel dashboard for deployment issues

## 🚀 Ready to Deploy?

```bash
# Make sure everything works locally first
npm start

# Then deploy
npm install -g vercel
vercel login
vercel
```

**That's it! Your app is live! 🎊**

---

**Questions?** Check the documentation files or browser console for errors.

**Enjoy your streaming chatbot! 💬📹**

