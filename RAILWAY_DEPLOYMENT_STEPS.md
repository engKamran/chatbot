# Deploy to Railway - Step by Step

## 🚀 Quick Deploy (5 minutes)

### Step 1: Go to Railway
Open: **https://railway.app**

### Step 2: Sign In with GitHub
- Click **"Start Project"**
- Click **"Sign in with GitHub"**
- Authorize Railway to access your GitHub account

### Step 3: Create New Project
- Click **"New Project"**
- Select **"Deploy from GitHub repo"**

### Step 4: Select Your Repository
- Search for: **chatbot**
- Click on: **engKamran/chatbot**
- Click **"Deploy Now"**

Railway will automatically:
- ✅ Build your app
- ✅ Deploy to production
- ✅ Generate a domain
- ✅ Start the server

### Step 5: Wait for Deployment
- Watch the build logs
- Wait for "Deployment successful" message
- Takes about 2-3 minutes

### Step 6: Get Your Domain
Once deployed:
1. Go to your Railway project
2. Click on your service (chatbot)
3. Look for the domain in the service details
4. It will be something like: `chatbot-production.up.railway.app`

### Step 7: Test Your App
- **Admin**: `https://your-railway-domain/admin.html`
- **Visitor**: `https://your-railway-domain/visitor.html`

---

## ✅ What's Deployed

Your app includes:
- ✅ Node.js + Express server
- ✅ Socket.io for real-time communication
- ✅ WebRTC for video streaming
- ✅ Admin dashboard
- ✅ Visitor queue system
- ✅ Live streaming functionality
- ✅ Simplified UI with green/red dots
- ✅ Full-screen admin camera
- ✅ Mobile-responsive design

---

## 🔗 Update Your Wix Site

Once you have your Railway domain, update your Wix iframe:

```html
<iframe 
  src="https://your-railway-domain/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

Replace `your-railway-domain` with your actual Railway domain.

---

## 🧪 Testing Checklist

After deployment, test:

### Admin Page
- [ ] Page loads
- [ ] Green dot shows (connected)
- [ ] Camera displays (full view, not zoomed)
- [ ] Queue shows 0
- [ ] No messages appear

### Visitor Page
- [ ] Page loads
- [ ] Green dot shows (connected)
- [ ] Can enter name
- [ ] Can join queue
- [ ] Queue position shows

### Full Flow
- [ ] Visitor joins queue
- [ ] Admin sees visitor in queue
- [ ] Admin accepts visitor
- [ ] Visitor sees admin's camera
- [ ] Admin can end stream
- [ ] Both disconnect cleanly

---

## 🆘 Troubleshooting

### If deployment fails:
1. Check build logs in Railway
2. Make sure all files are committed to GitHub
3. Verify Node.js version is 22.x
4. Check for any syntax errors

### If you can't find the domain:
1. Go to your Railway project
2. Click on the service (chatbot)
3. Look in the service details panel
4. Domain should be listed there

### If WebSocket doesn't work:
- Railway supports WebSocket ✅
- Make sure you're using HTTPS (not HTTP)
- Check browser console for errors

---

## 📊 Current Status

✅ Code is ready
✅ All changes pushed to GitHub
✅ UI simplified with green/red dots
✅ Admin camera full screen
✅ Camera zoom fixed
✅ Ready for Railway deployment

---

## 🎯 Next Steps

1. Go to https://railway.app
2. Sign in with GitHub
3. Deploy from your chatbot repo
4. Get your domain
5. Test the app
6. Update Wix with new URL
7. Start streaming! 🎬

---

## 💡 Tips

- Railway auto-deploys when you push to GitHub
- Free tier includes $5 credits/month
- No credit card needed for free tier
- Supports WebSocket (unlike Vercel)
- Perfect for real-time apps

**Ready to deploy? Go to https://railway.app now!** 🚀

