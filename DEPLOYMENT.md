# Deployment Guide

## Local Testing

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open in browser:
   - Admin: http://localhost:5000/admin.html
   - Visitor: http://localhost:5000/visitor.html

4. Test the flow:
   - Open admin page in one window
   - Open visitor page in another window
   - Join queue as visitor
   - Accept/reject as admin
   - Test video streaming

## Deploy to Vercel

### Option 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts:
   - Confirm project name
   - Confirm project root
   - Confirm build settings
   - Confirm deployment

### Option 2: Using GitHub Integration

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/streaming-chatbot.git
git push -u origin main
```

2. Go to https://vercel.com/new

3. Import your GitHub repository

4. Configure:
   - Framework: Other
   - Root Directory: ./
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

5. Click Deploy

## After Deployment

1. Get your Vercel URL (e.g., `https://streaming-chatbot.vercel.app`)

2. Test the deployed app:
   - Admin: https://streaming-chatbot.vercel.app/admin.html
   - Visitor: https://streaming-chatbot.vercel.app/visitor.html

3. Verify HTTPS is working (required for WebRTC)

## Embedding on Wix

### For Visitor Page

1. Go to your Wix site editor
2. Add an HTML iframe element
3. Paste this code:

```html
<iframe 
  src="https://streaming-chatbot.vercel.app/visitor.html" 
  width="100%" 
  height="700px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

### For Admin Page

1. Go to your Wix site editor
2. Add an HTML iframe element
3. Paste this code:

```html
<iframe 
  src="https://streaming-chatbot.vercel.app/admin.html" 
  width="100%" 
  height="900px" 
  frameborder="0"
  allow="camera; microphone"
  style="border: none; border-radius: 8px;"
></iframe>
```

## Troubleshooting

### WebRTC Not Working
- Ensure HTTPS is enabled (Vercel provides this automatically)
- Check browser console for errors
- Verify camera/microphone permissions are granted
- Try a different browser

### Connection Issues
- Check if server is running
- Verify Socket.io is connecting
- Check browser console for WebSocket errors
- Ensure firewall allows WebSocket connections

### Video Not Showing
- Check camera permissions
- Verify getUserMedia is working
- Check browser console for errors
- Try refreshing the page

## Performance Tips

1. **Optimize Video Quality**: Adjust video constraints in webrtc-utils.js
2. **Reduce Latency**: Use STUN servers closer to your region
3. **Monitor Connections**: Check server logs for connection issues
4. **Scale**: For multiple admins, modify server.js queue logic

## Security Considerations

1. Add authentication for admin page
2. Implement rate limiting
3. Add CORS restrictions
4. Validate all socket events
5. Use environment variables for sensitive data

## Monitoring

Monitor your Vercel deployment:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Check logs and analytics
4. Monitor bandwidth usage

## Custom Domain

To use a custom domain:
1. Go to Vercel project settings
2. Add custom domain
3. Update DNS records
4. Wait for verification

## Environment Variables

If needed, add environment variables in Vercel:
1. Go to project settings
2. Click Environment Variables
3. Add your variables
4. Redeploy

Example:
```
NODE_ENV=production
PORT=3000
```

## Rollback

To rollback to a previous deployment:
1. Go to Vercel project
2. Click Deployments
3. Find the deployment you want
4. Click the three dots
5. Select Promote to Production

