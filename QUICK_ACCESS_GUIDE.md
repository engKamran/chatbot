# 🚀 Quick Access Guide

## 🎯 Two Simple Ways to Access

---

## Option 1: Local Testing (Right Now!)

### Start Server:
```bash
npm start
```

### Open in Browser:

**Admin Page:**
```
http://localhost:5000/admin.html
```

**Visitor Page:**
```
http://localhost:5000/visitor.html
```

### Test Flow:
1. Open both pages in different browser windows
2. Visitor: Enter name → Click "Join Queue"
3. Admin: See visitor → Click "Accept Visitor"
4. Visitor: See admin's video → Watch stream
5. Either: Click "End Stream" or "Leave Stream"

---

## Option 2: Live on Vercel (After Deployment)

### Deploy:
1. Go to https://vercel.com
2. Import GitHub repo: https://github.com/engKamran/chatbot
3. Click "Deploy"
4. Wait 2-3 minutes

### Get Your URL:
Vercel will show: `https://chatbot-XXXXX.vercel.app`

### Open in Browser:

**Admin Page:**
```
https://chatbot-XXXXX.vercel.app/admin.html
```

**Visitor Page:**
```
https://chatbot-XXXXX.vercel.app/visitor.html
```

### Test Flow:
Same as local testing!

---

## Option 3: Embed on Wix

### Add to Wix:
1. Go to Wix site editor
2. Click "Add" → "HTML iframe"
3. Paste:

```html
<iframe 
  src="https://chatbot-XXXXX.vercel.app/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
></iframe>
```

4. Publish

### Visitors Can:
- Visit your Wix site
- See the embedded visitor page
- Join queue
- Watch admin's stream

---

## 📋 Admin Page

### What You See:
- 📹 Your camera feed
- 👥 Queue of visitors
- ✅ Accept/Reject buttons
- 🛑 End Stream button

### What You Do:
1. Camera turns ON automatically
2. See visitors in queue
3. Click "Accept Visitor"
4. Broadcast starts
5. Visitor watches your stream
6. Click "End Stream" when done

---

## 👥 Visitor Page

### What They See:
- ⏳ Queue position
- 📺 Admin's live stream (when accepted)
- 🎬 Watch broadcast
- 🚪 Leave button

### What They Do:
1. Enter their name
2. Click "Join Queue"
3. Wait for admin
4. See admin's video
5. Watch stream
6. Click "Leave Stream"

---

## 🔗 All URLs

### Local:
```
Admin:   http://localhost:5000/admin.html
Visitor: http://localhost:5000/visitor.html
```

### Live (Example):
```
Admin:   https://chatbot-abc123.vercel.app/admin.html
Visitor: https://chatbot-abc123.vercel.app/visitor.html
```

### GitHub:
```
https://github.com/engKamran/chatbot
```

### Vercel:
```
https://vercel.com
```

---

## ⏱️ Timeline

### Local Testing:
- Start server: 10 seconds
- Open pages: 5 seconds
- Test flow: 2 minutes
- **Total: ~3 minutes**

### Deploy to Vercel:
- Go to Vercel: 1 minute
- Import repo: 1 minute
- Deploy: 2-3 minutes
- **Total: ~5 minutes**

### Embed on Wix:
- Add iframe: 2 minutes
- Publish: 1 minute
- **Total: ~3 minutes**

### **Total to Go Live: ~10 minutes!**

---

## ✅ Testing Checklist

### Local:
- [ ] Run `npm start`
- [ ] Open admin page
- [ ] Open visitor page
- [ ] Visitor joins queue
- [ ] Admin accepts
- [ ] Visitor sees video
- [ ] Stream works
- [ ] Can end stream

### Live:
- [ ] Deploy to Vercel
- [ ] Get live URL
- [ ] Open admin page
- [ ] Open visitor page
- [ ] Test streaming
- [ ] Verify HTTPS
- [ ] Test on mobile
- [ ] Embed on Wix

---

## 🎯 Quick Start

### Right Now (Local):
```bash
npm start
```
Then open:
- Admin: http://localhost:5000/admin.html
- Visitor: http://localhost:5000/visitor.html

### Today (Live):
1. Go to https://vercel.com
2. Deploy your GitHub repo
3. Get live URL
4. Open admin and visitor pages
5. Test streaming

### This Week (Wix):
1. Add iframe to Wix
2. Use your Vercel URL
3. Publish
4. Start streaming!

---

## 🚀 Ready?

### Choose One:

**Option 1: Test Locally**
```bash
npm start
```

**Option 2: Deploy to Vercel**
Go to https://vercel.com

**Option 3: Embed on Wix**
Add iframe with Vercel URL

---

## 📞 Support

### Issues?
- Check browser console (F12)
- Check server logs
- Read HOW_TO_ACCESS.md
- Read TROUBLESHOOTING.md

### Questions?
- GitHub: https://github.com/engKamran/chatbot
- Vercel: https://vercel.com/docs
- Wix: https://www.wix.com/support

---

## Summary

### Local Access:
```
npm start
Admin:   http://localhost:5000/admin.html
Visitor: http://localhost:5000/visitor.html
```

### Live Access:
```
Admin:   https://chatbot-XXXXX.vercel.app/admin.html
Visitor: https://chatbot-XXXXX.vercel.app/visitor.html
```

### Wix Embed:
```html
<iframe src="https://chatbot-XXXXX.vercel.app/visitor.html" 
  width="100%" height="700px" frameborder="0"
  allow="camera; microphone"></iframe>
```

---

**Ready to access your streaming chatbot?** 🎉

**Start with local testing or deploy to Vercel!** 🚀

