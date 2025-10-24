# 🌐 How to Access Admin and Visitor Pages

## 📍 Two Ways to Access

### Option 1: Local Testing (Right Now)

If you want to test locally before deploying:

```bash
npm start
```

Then open in your browser:

**Admin Page:**
```
http://localhost:5000/admin.html
```

**Visitor Page:**
```
http://localhost:5000/visitor.html
```

### Option 2: After Vercel Deployment (Live)

Once deployed to Vercel, you'll have a live URL like:
```
https://chatbot-XXXXX.vercel.app
```

Then access:

**Admin Page:**
```
https://chatbot-XXXXX.vercel.app/admin.html
```

**Visitor Page:**
```
https://chatbot-XXXXX.vercel.app/visitor.html
```

---

## 🚀 Quick Start - Local Testing

### Step 1: Start Server

Open terminal and run:

```bash
npm start
```

You should see:
```
Server running on port 5000
```

### Step 2: Open Two Browser Windows

**Window 1 - Admin:**
```
http://localhost:5000/admin.html
```

**Window 2 - Visitor:**
```
http://localhost:5000/visitor.html
```

### Step 3: Test the Flow

**In Visitor Window:**
1. Enter your name
2. Click "Join Queue"
3. Wait for admin

**In Admin Window:**
1. See visitor in queue
2. Click "Accept Visitor"
3. See video section

**Back to Visitor Window:**
1. See "Connecting to Admin Live Stream..."
2. Admin's video appears
3. See "Connected!" message
4. Watch the broadcast!

**Either Window:**
1. Click "End Stream" or "Leave Stream"
2. Stream ends
3. Admin ready for next visitor

---

## 🌐 After Vercel Deployment

### Step 1: Deploy to Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Click "Deploy"
4. Wait 2-3 minutes

### Step 2: Get Your Live URL

After deployment, Vercel will show:
```
https://chatbot-XXXXX.vercel.app
```

### Step 3: Access Your Pages

**Admin Dashboard:**
```
https://chatbot-XXXXX.vercel.app/admin.html
```

**Visitor Page:**
```
https://chatbot-XXXXX.vercel.app/visitor.html
```

### Step 4: Test Live

1. Open admin page in one browser
2. Open visitor page in another browser
3. Test the streaming flow
4. Everything works!

---

## 📱 Embed on Wix

### Add Visitor Page to Wix

1. Go to Wix site editor
2. Click "Add" → "HTML iframe"
3. Paste this code:

```html
<iframe 
  src="https://chatbot-XXXXX.vercel.app/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

**Replace `chatbot-XXXXX` with your actual Vercel URL!**

4. Adjust height if needed
5. Publish

### Add Admin Page to Wix (Optional)

1. Create new page on Wix (e.g., /admin)
2. Add HTML iframe element
3. Paste:

```html
<iframe 
  src="https://chatbot-XXXXX.vercel.app/admin.html" 
  width="100%" 
  height="900px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

4. Restrict access to admin only (Wix settings)
5. Publish

---

## 🎯 Admin Page Features

### What You See:
- 📹 Your camera feed
- 👥 Queue of waiting visitors
- ✅ Accept/Reject buttons
- 🛑 End Stream button
- 📊 Connection status

### What You Can Do:
1. See all visitors waiting
2. Accept a visitor to stream
3. Reject a visitor
4. End stream when done
5. See connection status

---

## 👥 Visitor Page Features

### What They See:
- 📺 Admin's live stream
- ⏳ Queue position
- 📊 Connection status
- 🎬 Watch broadcast
- 🚪 Leave stream button

### What They Can Do:
1. Enter their name
2. Join the queue
3. Wait for admin
4. Watch admin's live stream
5. Leave stream anytime

---

## 🔗 Direct Links

### Local (Testing):
- Admin: http://localhost:5000/admin.html
- Visitor: http://localhost:5000/visitor.html

### Live (After Deployment):
- Admin: https://chatbot-XXXXX.vercel.app/admin.html
- Visitor: https://chatbot-XXXXX.vercel.app/visitor.html

### GitHub:
- Repository: https://github.com/engKamran/chatbot

### Vercel:
- Dashboard: https://vercel.com

---

## 📋 Testing Checklist

### Local Testing:
- [ ] Run `npm start`
- [ ] Open admin page
- [ ] Open visitor page
- [ ] Visitor joins queue
- [ ] Admin accepts
- [ ] Visitor sees admin's video
- [ ] Stream works
- [ ] Either can end stream

### Live Testing (After Vercel):
- [ ] Deploy to Vercel
- [ ] Get live URL
- [ ] Open admin page
- [ ] Open visitor page
- [ ] Test streaming flow
- [ ] Verify HTTPS works
- [ ] Test on mobile
- [ ] Embed on Wix

---

## ❓ Troubleshooting

### Can't access localhost?
- Make sure server is running: `npm start`
- Check port 5000 is not in use
- Try http://localhost:5000 (not https)

### Can't access Vercel URL?
- Wait a few minutes for deployment
- Refresh page
- Check Vercel dashboard for errors
- Check browser console (F12)

### Camera not working?
- Check browser permissions
- Allow camera access
- Try different browser
- Check camera is not in use

### No audio?
- Check microphone permissions
- Check volume settings
- Try different browser

---

## 🚀 Quick Reference

### Local:
```bash
npm start
# Then open:
# Admin: http://localhost:5000/admin.html
# Visitor: http://localhost:5000/visitor.html
```

### Live:
```
Admin: https://chatbot-XXXXX.vercel.app/admin.html
Visitor: https://chatbot-XXXXX.vercel.app/visitor.html
```

### Wix:
```html
<iframe src="https://chatbot-XXXXX.vercel.app/visitor.html" 
  width="100%" height="700px" frameborder="0"
  allow="camera; microphone"></iframe>
```

---

## Summary

### To Access Locally:
1. Run `npm start`
2. Open http://localhost:5000/admin.html (admin)
3. Open http://localhost:5000/visitor.html (visitor)

### To Access Live:
1. Deploy to Vercel
2. Get your live URL
3. Open https://chatbot-XXXXX.vercel.app/admin.html (admin)
4. Open https://chatbot-XXXXX.vercel.app/visitor.html (visitor)

### To Embed on Wix:
1. Add iframe with Vercel URL
2. Publish

---

**Ready to test?** Start with local testing or deploy to Vercel! 🚀

