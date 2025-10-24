# 🚀 Deploy to Railway (Recommended)

## ⚠️ Why Not Vercel?

Vercel doesn't support WebSocket connections, which your app needs for real-time communication.

**Solution: Deploy to Railway instead!**

---

## ✅ Why Railway?

- ✅ Supports WebSocket
- ✅ Free tier available
- ✅ Easy GitHub integration
- ✅ Fast deployment
- ✅ Perfect for real-time apps
- ✅ Simple pricing

---

## 🚀 Deploy to Railway in 5 Minutes

### Step 1: Go to Railway
1. Open https://railway.app
2. Click "Start Project"
3. Sign in with GitHub
4. Authorize Railway

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Search for: `engKamran/chatbot`
4. Select your repo
5. Click "Deploy"

### Step 3: Wait for Deployment
- Railway will automatically deploy your app
- Takes about 2-3 minutes
- You'll see a green checkmark when done

### Step 4: Get Your URL
1. Go to your Railway project
2. Click on your service
3. Go to "Settings"
4. Copy your domain (looks like: `chatbot-production.up.railway.app`)

### Step 5: Test Your App
Replace `chatbot-mj5s.vercel.app` with your Railway URL:

**Admin:**
```
https://your-railway-url/admin.html
```

**Visitor:**
```
https://your-railway-url/visitor.html
```

---

## 📋 Step-by-Step Guide

### 1. Create Railway Account

**Go to:** https://railway.app

**Click:** "Start Project"

**Sign in with:** GitHub

**Authorize:** Railway to access your GitHub

---

### 2. Deploy Your Repository

**Click:** "New Project"

**Select:** "Deploy from GitHub repo"

**Search:** `engKamran/chatbot`

**Select:** Your repository

**Click:** "Deploy"

---

### 3. Wait for Deployment

Railway will:
1. Clone your repository
2. Install dependencies
3. Build your app
4. Start your server
5. Assign a domain

**Status:** You'll see a green checkmark when done

---

### 4. Get Your Domain

**Go to:** Your Railway project

**Click:** Your service (chatbot)

**Go to:** "Settings"

**Copy:** Your domain

**Example:** `chatbot-production.up.railway.app`

---

### 5. Test Your App

**Admin Page:**
```
https://your-railway-url/admin.html
```

**Visitor Page:**
```
https://your-railway-url/visitor.html
```

**Expected:**
- ✅ Pages load
- ✅ Connection shows "Connected"
- ✅ No socket errors
- ✅ Real-time communication works

---

## 🎯 Update Your Wix Site

Replace the Vercel URL with your Railway URL:

### Old (Vercel - Doesn't Work):
```html
<iframe 
  src="https://chatbot-mj5s.vercel.app/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

### New (Railway - Works Perfect):
```html
<iframe 
  src="https://your-railway-url/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

---

## ✅ Testing Checklist

After deploying to Railway:

- [ ] Admin page loads
- [ ] Visitor page loads
- [ ] Admin shows "Connected"
- [ ] Visitor shows "Connected"
- [ ] No socket errors
- [ ] Visitor can join queue
- [ ] Admin sees visitor in queue
- [ ] Admin can accept visitor
- [ ] Visitor receives acceptance
- [ ] Stream works
- [ ] Either can end stream
- [ ] Connection stays stable

---

## 🔒 Security

Railway provides:
- ✅ HTTPS encrypted
- ✅ DDoS protection
- ✅ Automatic backups
- ✅ SSL certificates

---

## 📊 Performance

Railway provides:
- ✅ Fast deployment
- ✅ Low latency
- ✅ Auto-scaling
- ✅ Global CDN
- ✅ Unlimited bandwidth

---

## 💰 Pricing

**Free Tier:**
- $5 free credits per month
- Enough for small projects
- Perfect for testing

**Paid:**
- $5/month minimum
- Pay as you go
- Scales with usage

---

## 🆘 If Deployment Fails

### Check Logs
1. Go to your Railway project
2. Click "Logs"
3. Look for error messages
4. Common issues:
   - Missing environment variables
   - Port not set
   - Dependencies not installed

### Common Fixes
1. Make sure `package.json` is in root
2. Make sure `server.js` is in root
3. Make sure `public` folder exists
4. Check that Node.js version is 22.x

### Redeploy
1. Go to "Deployments"
2. Click "Redeploy"
3. Wait for new deployment

---

## 📞 Support

If you have issues:
1. Check Railway logs
2. Check browser console (F12)
3. Try refreshing page
4. Try different browser
5. Contact Railway support

---

## 🌐 Your URLs

### Local (Development):
- Admin: http://localhost:5000/admin.html
- Visitor: http://localhost:5000/visitor.html

### Railway (Production):
- Admin: https://your-railway-url/admin.html
- Visitor: https://your-railway-url/visitor.html

### GitHub:
- Repository: https://github.com/engKamran/chatbot

---

## Summary

**Vercel:** ❌ Doesn't support WebSocket

**Railway:** ✅ Supports WebSocket perfectly

**Time to Deploy:** 5 minutes

**Cost:** Free tier available

**Recommendation:** Deploy to Railway now!

---

## Next Steps

1. Go to https://railway.app
2. Sign up with GitHub
3. Deploy your repo
4. Get your Railway URL
5. Test your app
6. Update Wix with new URL
7. Start streaming!

---

**Ready to deploy to Railway?** 🚀

**Go to https://railway.app now!**

---

**Status:** ✅ READY FOR RAILWAY

**Time to Deploy:** 5 minutes

**Cost:** Free

**Result:** Perfect real-time communication!

