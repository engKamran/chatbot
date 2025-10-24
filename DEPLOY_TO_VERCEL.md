# 🚀 Deploy to Vercel - Step by Step

## ✅ Your Code is Ready!

Your code has been committed to Git locally. Now we need to:
1. Create a GitHub repository
2. Push code to GitHub
3. Deploy to Vercel
4. Get your live URL

## Step 1: Create GitHub Repository

### Option A: Using GitHub Web (Easiest)

1. Go to https://github.com/new
2. Sign in (create account if needed)
3. Fill in:
   - **Repository name:** `streaming-chatbot` (or any name)
   - **Description:** "One-way live streaming chatbot with admin broadcast"
   - **Public** (so Vercel can access it)
4. Click "Create repository"
5. Copy the URL (looks like: `https://github.com/YOUR_USERNAME/streaming-chatbot.git`)

### Option B: Using GitHub CLI

```bash
# Install GitHub CLI from https://cli.github.com
# Then run:
gh repo create streaming-chatbot --public --source=. --remote=origin --push
```

## Step 2: Push Code to GitHub

### Using the URL from Step 1:

```bash
# Add remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/streaming-chatbot.git

# Rename branch to main
git branch -M main

# Push code
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

## Step 3: Deploy to Vercel

### Option A: Using Vercel Web (Easiest)

1. Go to https://vercel.com
2. Sign up or sign in (can use GitHub account)
3. Click "New Project"
4. Click "Import Git Repository"
5. Paste your GitHub URL: `https://github.com/YOUR_USERNAME/streaming-chatbot`
6. Click "Import"
7. Vercel will auto-detect settings
8. Click "Deploy"
9. Wait for deployment (2-3 minutes)
10. You'll get a URL like: `https://streaming-chatbot.vercel.app`

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Follow prompts
# You'll get a live URL!
```

## Step 4: Your App is Live! 🎉

Once deployed, you'll have:

**Admin Page:**
```
https://YOUR_PROJECT.vercel.app/admin.html
```

**Visitor Page:**
```
https://YOUR_PROJECT.vercel.app/visitor.html
```

## Test Your Live App

1. Open admin page in one browser
2. Open visitor page in another browser
3. Test the streaming flow
4. Everything should work!

## Embed on Wix

Now you can embed on your Wix site:

```html
<iframe 
  src="https://YOUR_PROJECT.vercel.app/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

Replace `YOUR_PROJECT` with your actual Vercel project name.

## Complete Workflow

```
Local Code
    ↓
Git Commit (✅ Done)
    ↓
GitHub Repository (Step 1)
    ↓
Push to GitHub (Step 2)
    ↓
Vercel Deployment (Step 3)
    ↓
Live URL (Step 4)
    ↓
Embed on Wix
    ↓
🎉 Live Streaming!
```

## Troubleshooting

### "Repository not found"
- Check your GitHub URL is correct
- Make sure repository is public
- Try again

### "Deployment failed"
- Check server.js for errors
- Check package.json is correct
- Check vercel.json is correct
- Try deploying again

### "Can't connect to admin/visitor"
- Check Vercel URL is correct
- Wait a few minutes for deployment
- Refresh page
- Check browser console (F12)

## What Happens After Deployment

✅ Your app is live on Vercel
✅ HTTPS enabled automatically
✅ Auto-scaling for visitors
✅ Free tier includes:
  - 100 GB bandwidth/month
  - Unlimited deployments
  - Automatic SSL

## Update Your App

If you make changes:

```bash
# Make changes to files
# Then:
git add .
git commit -m "Your message"
git push origin main

# Vercel auto-deploys!
# Your live app updates automatically
```

## Your Live URLs

After deployment, you'll have:

**Admin Dashboard:**
```
https://YOUR_PROJECT.vercel.app/admin.html
```

**Visitor Page:**
```
https://YOUR_PROJECT.vercel.app/visitor.html
```

**Share with visitors:**
```
https://YOUR_PROJECT.vercel.app/visitor.html
```

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Deploy to Vercel
4. ✅ Get live URL
5. ✅ Embed on Wix
6. ✅ Start streaming!

## Summary

Your app will be:
- ✅ Live on the internet
- ✅ Accessible from anywhere
- ✅ HTTPS secured
- ✅ Auto-scaling
- ✅ Free tier available

## Questions?

- GitHub Help: https://docs.github.com
- Vercel Help: https://vercel.com/docs
- Check TROUBLESHOOTING.md

---

**Ready to go live?** Follow the steps above!

**Your app will be live in 10 minutes!** 🚀

