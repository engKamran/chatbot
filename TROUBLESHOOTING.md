# Troubleshooting Guide

## Common Issues and Solutions

### 1. Server Won't Start

**Error**: `EADDRINUSE: address already in use :::3000`

**Solution**:
```bash
# Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :5000
kill -9 <PID>

# Or change port in server.js
const PORT = process.env.PORT || 8000; // Use different port
```

### 2. Camera/Microphone Not Working

**Error**: Permission denied or no camera access

**Solutions**:
1. Check browser permissions:
   - Chrome: Settings → Privacy → Camera/Microphone
   - Firefox: Preferences → Privacy → Permissions
   - Safari: System Preferences → Security & Privacy

2. Try incognito/private mode

3. Try different browser

4. Restart browser

5. Check if another app is using camera

### 3. WebRTC Connection Failed

**Error**: "Connection failed" or no video stream

**Solutions**:
1. Ensure HTTPS is enabled (required for WebRTC)
   - Local: http://localhost:5000 (OK for testing)
   - Production: Must be HTTPS

2. Check firewall settings

3. Try different network

4. Check browser console (F12) for errors

5. Verify STUN servers are accessible

### 4. Socket.io Connection Failed

**Error**: "Connection refused" or "Cannot connect to server"

**Solutions**:
1. Verify server is running:
   ```bash
   npm start
   ```

2. Check correct URL:
   - Local: http://localhost:5000
   - Production: https://your-app.vercel.app

3. Check network connection

4. Check firewall/proxy settings

5. Check browser console for errors

### 5. Video Not Showing

**Error**: Black screen or no video

**Solutions**:
1. Check camera is working:
   - Test in another app
   - Check device manager

2. Verify permissions granted

3. Check browser console for errors

4. Try refreshing page

5. Try different browser

6. Check video element is properly configured

### 6. Queue Not Updating

**Error**: Queue position not showing or not updating

**Solutions**:
1. Check Socket.io connection:
   - Open browser console (F12)
   - Look for Socket.io connection messages

2. Verify server is running

3. Check network tab for WebSocket connection

4. Restart browser

5. Check server logs for errors

### 7. Embedded on Wix Not Working

**Error**: Iframe not loading or not working

**Solutions**:
1. Verify correct URL:
   ```html
   <iframe src="https://your-app.vercel.app/visitor.html" ...>
   ```

2. Add required attributes:
   ```html
   allow="camera; microphone"
   ```

3. Check CORS headers are set

4. Verify X-Frame-Options header:
   ```javascript
   res.setHeader('X-Frame-Options', 'ALLOWALL');
   ```

5. Test in different browser

6. Check browser console for errors

### 8. Deployment to Vercel Failed

**Error**: Deployment error or build failed

**Solutions**:
1. Check vercel.json is correct

2. Verify package.json has correct scripts

3. Check for syntax errors:
   ```bash
   npm start
   ```

4. Check Vercel logs:
   - Go to Vercel dashboard
   - Click on deployment
   - Check build logs

5. Try redeploying:
   ```bash
   vercel --prod
   ```

### 9. HTTPS Not Working

**Error**: "Not secure" or WebRTC not working

**Solutions**:
1. Vercel provides HTTPS automatically

2. Check URL starts with https://

3. Clear browser cache

4. Try different browser

5. Check SSL certificate is valid

### 10. High Latency/Lag

**Error**: Video/audio delay or stuttering

**Solutions**:
1. Check internet connection speed

2. Reduce video quality in webrtc-utils.js:
   ```javascript
   video: {
     width: { ideal: 640 },  // Reduce from 1280
     height: { ideal: 480 }  // Reduce from 720
   }
   ```

3. Close other applications

4. Try wired connection instead of WiFi

5. Check server location (use closer STUN server)

### 11. Memory Leak

**Error**: App slows down over time

**Solutions**:
1. Ensure streams are properly closed:
   ```javascript
   webrtcManager.stop();
   ```

2. Remove event listeners

3. Clear references

4. Check browser DevTools for memory usage

5. Restart server periodically

### 12. Multiple Admins Connecting

**Error**: Only one admin can connect

**Solution**: This is by design. To support multiple admins:
1. Modify server.js queue logic
2. Create separate queues per admin
3. Implement admin selection for visitors

## Debug Mode

### Enable Logging

Add to server.js:
```javascript
io.on('connection', (socket) => {
  console.log('Connection:', socket.id);
  
  socket.on('admin-join', () => {
    console.log('Admin joined:', socket.id);
  });
  
  socket.on('visitor-join', (data) => {
    console.log('Visitor joined:', data.name);
  });
});
```

### Browser Console Debugging

1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for WebSocket
5. Check Application tab for storage

### Check Server Logs

```bash
# Run server with verbose logging
NODE_DEBUG=* npm start
```

## Performance Monitoring

### Check Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Select your project
3. Check Analytics
4. Monitor bandwidth usage
5. Check error rates

### Monitor Locally
```bash
# Check memory usage
node --max-old-space-size=4096 server.js

# Check CPU usage
npm install -g clinic
clinic doctor -- npm start
```

## Network Issues

### Check WebSocket Connection
```javascript
// In browser console
socket.on('connect', () => console.log('Connected'));
socket.on('disconnect', () => console.log('Disconnected'));
socket.on('error', (error) => console.log('Error:', error));
```

### Check CORS
```bash
# Test CORS headers
curl -i http://localhost:5000
```

## Browser-Specific Issues

### Chrome
- Check chrome://flags for WebRTC settings
- Disable extensions if issues occur
- Check chrome://webrtc-internals for connection details

### Firefox
- Check about:config for WebRTC settings
- Disable privacy.trackingprotection if needed

### Safari
- Requires macOS 11+
- Check System Preferences for camera access
- May need to enable WebRTC in settings

## Still Having Issues?

1. **Check Documentation**:
   - README.md
   - QUICKSTART.md
   - DEPLOYMENT.md

2. **Check Browser Console**:
   - F12 → Console tab
   - Look for error messages

3. **Check Server Logs**:
   - Terminal where npm start runs
   - Look for error messages

4. **Check Network**:
   - F12 → Network tab
   - Look for failed requests
   - Check WebSocket connection

5. **Try Fresh Start**:
   ```bash
   # Clear everything
   rm -rf node_modules package-lock.json
   npm install
   npm start
   ```

## Getting Help

1. Check this troubleshooting guide
2. Check browser console for errors
3. Check server logs
4. Read documentation
5. Try different browser
6. Try fresh installation

## Report Issues

When reporting issues, include:
- Error message
- Browser and version
- Operating system
- Steps to reproduce
- Browser console errors
- Server logs

