# Deploy Backend to Render

Complete step-by-step guide to deploy your Express.js backend to Render.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Prepare Code](#prepare-code)
3. [Create Render Account](#create-render-account)
4. [Deploy Backend](#deploy-backend)
5. [Configure Environment](#configure-environment)
6. [Verify Deployment](#verify-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Updates & Redeployment](#updates--redeployment)

---

## Prerequisites

### What You Need

✅ Render account (free) → [render.com](https://render.com)  
✅ GitHub repository with code  
✅ Neon PostgreSQL database URL  
✅ GitHub connected to Render  

### Create GitHub Repository

If you haven't already:

```bash
cd TO-DO-LIST
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/todo-list.git
git push -u origin main
```

---

## Prepare Code

### 1. Add Production Build Configuration

Ensure your `package.json` has correct scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**Render will run:** `npm start`

### 2. Verify `.env` Variables

Check you have `.env.example`:

```bash
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Never commit actual `.env` file!** Render will set these as environment variables.

### 3. Verify `server.js`

Make sure it reads PORT from environment:

```javascript
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Why?** Render assigns a random PORT. Must use `process.env.PORT`.

### 4. Add Node Version (Optional but Recommended)

Create `engines` in `package.json`:

```json
{
  "engines": {
    "node": "18.x"
  }
}
```

---

## Create Render Account

### Step 1: Sign Up

1. Go to [render.com](https://render.com)
2. Click "Get Started"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your GitHub

### Step 2: Verify Email

Check email and click verification link

---

## Deploy Backend

### Step 1: Create Web Service

1. **Dashboard** → Click "New +" button → Select **"Web Service"**

2. **Connect GitHub**
   - Click "Connect GitHub repository"
   - Search for your repository
   - Click "Connect"

3. **Configure Service**
   - **Name:** `todo-api` (or your preference)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users (e.g., `us-east-1`)
   - **Branch:** `main`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`

4. **Plan:** Choose "Free" (sufficient for learning)

5. **Advanced Settings** (optional)
   - Set auto-deploy: ✅ (auto-redeploy when pushing to GitHub)

### Step 2: Set Environment Variables

**BEFORE clicking "Create Web Service":**

1. Scroll down to **"Environment"**
2. Click **"Add Environment Variable"**
3. Add these variables:

```
DATABASE_URL = postgresql://user:password@host/database?sslmode=require
NODE_ENV = production
FRONTEND_URL = https://your-frontend.vercel.app
PORT = (leave blank - Render sets this)
```

**Get DATABASE_URL from Neon:**
1. Log in to [console.neon.tech](https://console.neon.tech)
2. Select your project
3. Click your database
4. Click "Connection string"
5. Copy the "Pooled connection" string
6. Paste into Render

### Step 3: Deploy

Click **"Create Web Service"**

**Render will:**
1. Clone your repository
2. Install dependencies
3. Run database migrations
4. Start the server

**Monitor the deployment:**
- Watch build logs in real-time
- Should say "✓ Deployed successfully" or "Service is live"

---

## Verify Deployment

### Check Service Status

1. Dashboard shows your service
2. Status should be **"Live"** (green)
3. Copy your service URL (e.g., `https://todo-api-xyz123.onrender.com`)

### Test Health Check

```bash
curl https://todo-api-xyz123.onrender.com/health
```

Should return:
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

### Test API

```bash
# Get all tasks (should return empty array or tasks)
curl https://todo-api-xyz123.onrender.com/api/tasks

# Should return:
{
  "tasks": [],
  "pagination": {...}
}
```

### Check Logs

1. Click on your service
2. Logs tab → View real-time logs
3. Look for:
   - ✅ `✓ Deployed successfully`
   - ✅ `Server running on...`
   - ❌ Any error messages

---

## Configure Environment

### Update Frontend with Backend URL

Now that backend is deployed, update frontend:

**`frontend/.env.production`** (create if not exist):

```env
VITE_API_URL=https://todo-api-xyz123.onrender.com/api
```

Deploy frontend to Vercel with this URL.

### Double-Check CORS

Make sure backend `.env` has correct FRONTEND_URL:

```env
FRONTEND_URL=https://your-frontend.vercel.app
```

**If you get CORS errors:**
1. Go to Render dashboard
2. Click your service → Settings
3. Environment → Update FRONTEND_URL
4. Service auto-restarts

---

## Troubleshooting

### Issue: "Build Failed"

**Common Causes:**

1. **Missing dependencies**
   ```bash
   # Make sure all used packages are in package.json
   npm install --save package-name
   git push
   ```

2. **Node version mismatch**
   - Add engines to package.json
   - Render uses Node 18 by default

3. **Script errors**
   - Check `start` script in package.json
   - Test locally: `npm start`

### Issue: "Service is crashing" or "Internal Server Error"

**Common Causes:**

1. **Missing DATABASE_URL**
   - Check Render environment variables
   - Verify PostgreSQL connection string
   - Ensure credentials are correct

2. **Database not running**
   - Check Neon database status
   - Try accessing PostgreSQL connection directly

3. **Port issue**
   - Render assigns PORT automatically
   - Must use `process.env.PORT` in code

**Fix:**
```bash
# Check logs for exact error
# On Render dashboard → Logs tab
# Look for red error messages

# If database issue, verify connection
# DATABASE_URL format must be:
postgresql://user:password@host/database?sslmode=require
```

### Issue: "Timeout" when checking health

**Causes:**
- Server taking too long to start
- Database connection failing
- Check logs for blocking operations

**Fix:**
```javascript
// In database/db.js
prisma.$connect()
  .then(() => console.log('DB connected'))
  .catch((err) => {
    console.error('DB error:', err.message);
    process.exit(1);  // Exit if can't connect
  });
```

### Issue: CORS Errors from Frontend

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Cause:** `FRONTEND_URL` doesn't match

**Fix:**
1. Get actual frontend URL from Vercel
2. Update Render environment:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Service auto-restarts

### Issue: "Cannot find module"

**Cause:** Package not installed

**Fix:**
```bash
# Install missing package
npm install package-name

# Push to GitHub
git add package.json package-lock.json
git commit -m "Add missing package"
git push

# Render auto-redeploys
```

---

## Updates & Redeployment

### Automatic Redeployment

When you push to GitHub, Render automatically redeploys:

```bash
# Make changes locally
git add .
git commit -m "Fix bug in tasks API"
git push origin main

# Render automatically:
# 1. Detects the push
# 2. Pulls new code
# 3. Rebuilds
# 4. Restarts service
```

**Watch deployment:**
- Dashboard → Logs tab → See build progress

### Manual Redeployment

If you need to redeploy without code changes:

1. Dashboard → Your service
2. Click "..." menu
3. Select "Redeployment" → "Latest Deployment"
4. Click "Redeploy"

### Environment Variable Changes

Changes to environment variables also trigger restart:

1. Dashboard → Service → Settings
2. Environment → Edit variable
3. Click "Update"
4. Service restarts automatically

---

## Production Checklist

Before going live, verify:

✅ Database connected and working  
✅ Health check responds  
✅ API endpoints accessible  
✅ Frontend has correct API URL  
✅ CORS configured correctly  
✅ Error messages not exposing sensitive info  
✅ Rate limiting enabled  
✅ Logging enabled for debugging  
✅ Database backups enabled  

---

## Monitoring Production

### Logs

```
Dashboard → Service → Logs
- Monitor for errors
- Check response times
- Watch for failed requests
```

### Metrics

```
Dashboard → Metrics
- CPU usage
- Memory usage
- Request count
- Error count
```

### Database

```
Neon Console → Your project
- Check connection status
- View query logs
- Monitor storage usage
```

---

## Useful Commands

### See Service Logs

```bash
# Via Render dashboard (easiest)
Dashboard → Service → Logs tab
```

### Check Health from Command Line

```bash
curl https://todo-api-xyz123.onrender.com/health
```

### View Environment Variables

```bash
# Via Render dashboard
Dashboard → Service → Settings → Environment
```

---

## Costs

### Free Tier (Suitable for Learning)

- Render: ✅ Free (spins down after 15 min inactivity)
- Neon: ✅ Free (includes 10GB storage)
- Vercel: ✅ Free (for frontend)

**Total:** **$0/month**

### Production Tier (if needed later)

- Render: ~$7/month (always-on instance)
- Neon: ~$0.16/hour (auto-scales)
- Vercel: ~$20/month (Team plan)

**Total:** ~$25-30/month

---

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Test API endpoints
3. → Deploy frontend to Vercel
4. → Test full integration
5. → Configure custom domain (optional)
6. → Set up monitoring

---

## Support

### Render Docs
- [Render Node.js Guide](https://render.com/docs/deploy-node-express-app)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Troubleshooting](https://render.com/docs/troubleshooting)

### Neon Docs
- [PostgreSQL Connection](https://neon.tech/docs/connect/connect-from-any-app)
- [Connection Issues](https://neon.tech/docs/troubleshooting)

### Common Issues Community
- [Render Community](https://community.render.com/)
- [GitHub Issues](https://github.com/)

---

## Cheat Sheet

```bash
# Quick reference

# Get service URL
https://todo-api-xyz123.onrender.com

# Test health
curl https://todo-api-xyz123.onrender.com/health

# Test API
curl https://todo-api-xyz123.onrender.com/api/tasks

# Redeploy manually
Dashboard → Service → ... → Redeployment

# View logs
Dashboard → Service → Logs

# Change environment
Dashboard → Service → Settings → Environment

# Update code
git push origin main
# (Render auto-redeploys)
```

---

**Congratulations!** Your backend is now live! 🚀
