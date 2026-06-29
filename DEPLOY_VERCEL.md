# Deploy Frontend to Vercel

Complete step-by-step guide to deploy your React frontend to Vercel.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Prepare Code](#prepare-code)
3. [Create Vercel Account](#create-vercel-account)
4. [Deploy Frontend](#deploy-frontend)
5. [Configure Environment](#configure-environment)
6. [Verify Deployment](#verify-deployment)
7. [Troubleshooting](#troubleshooting)
8. [Updates & Redeployment](#updates--redeployment)
9. [Custom Domain](#custom-domain)

---

## Prerequisites

### What You Need

✅ Vercel account (free) → [vercel.com](https://vercel.com)  
✅ GitHub repository with code  
✅ Backend deployed to Render (or have the URL)  
✅ GitHub connected to Vercel  

### Verify GitHub Setup

```bash
# Check code is in GitHub
git remote -v
# Should show origin pointing to GitHub

git status
# Should be clean (nothing to commit)
```

---

## Prepare Code

### 1. Verify Build Configuration

Check `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### 2. Check `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Vercel will run:** `npm run build`  
**Vercel expects:** Built files in `dist/` folder

### 3. Verify `.env` Files

Check you have `.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

**Never commit actual `.env.local` file!** Vercel will set as environment variable.

### 4. Test Build Locally

```bash
cd frontend
npm run build
npm run preview
```

If this works locally, it works on Vercel!

---

## Create Vercel Account

### Step 1: Sign Up

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub" (easiest)
4. Authorize Vercel to access your GitHub

### Step 2: Verify Email

Check email and click verification link

---

## Deploy Frontend

### Step 1: Import Project

1. **Dashboard** → Click "Add New..." → Select **"Project"**

2. **Select GitHub Repository**
   - Choose "Import Git Repository"
   - Search for your repo
   - Click "Select"

3. **Configure Project**

   **Root Directory:** Click and select `frontend`
   
   **Framework:** `Vite` (might auto-detect)
   
   **Build Command:** `npm run build`
   
   **Output Directory:** `dist`
   
   **Install Command:** `npm install` (default)

4. **Environment Variables**

   Add variable:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend.onrender.com/api`
   
   (Get backend URL from Render dashboard)

5. **Click "Deploy"**

**Vercel will:**
1. Clone your repository
2. Install dependencies
3. Run build: `npm run build`
4. Deploy to CDN
5. Generate URL

---

## Verify Deployment

### Check Deployment Status

1. Dashboard shows your project
2. Status should show **✓ Ready** or **✓ Production** (blue)
3. Copy your project URL (e.g., `https://todo-app-xyz.vercel.app`)

### Open Your App

Click the URL to open deployed frontend

**Should see:**
- ✅ Todo app loads
- ✅ Can see form and tasks area
- ✅ Dark mode toggle works
- ✅ Navigation works

### Test API Connection

1. Click "Add Task"
2. Fill in form
3. Click "Save"

**Should work!** If not, see [Troubleshooting](#troubleshooting)

### Check Build Logs

1. Click "Deployments" tab
2. Click latest deployment
3. View build log
4. Look for errors in red

---

## Configure Environment

### Verify Frontend URL Set in Backend

Your backend needs to know the frontend URL for CORS:

1. Go to Render dashboard
2. Click your backend service
3. Settings → Environment
4. Find `FRONTEND_URL`
5. Update to: `https://your-app.vercel.app`
6. Service auto-restarts

### Update Local Development

When developing locally, update `.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
```

When building for production:

```env
VITE_API_URL=https://todo-api-xyz.onrender.com/api
```

---

## Troubleshooting

### Issue: Build Failed

**Common Causes:**

1. **Missing dependencies**
   ```bash
   cd frontend
   npm install
   git add package-lock.json
   git commit -m "Update dependencies"
   git push
   ```

2. **Wrong root directory**
   - Vercel Settings → General → Root Directory
   - Must be `frontend/`

3. **Script not found**
   - Check `package.json` has `build` script
   - Run locally: `npm run build`

**Fix:** Push to GitHub, Vercel auto-redeploys

### Issue: "Cannot find module" or "Build Error"

**Cause:** Missing dependency

**Fix:**
```bash
# Install package
cd frontend
npm install package-name

# Update lock file
git add package-lock.json
git commit -m "Add missing package"
git push

# Vercel auto-redeploys
```

### Issue: "API calls fail" or CORS errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Causes:**
1. `VITE_API_URL` wrong in environment
2. Backend `FRONTEND_URL` wrong
3. Backend not running

**Fix:**

1. **Check frontend environment variable**
   ```
   Vercel Dashboard → Project Settings → Environment Variables
   VITE_API_URL = https://todo-api-xyz123.onrender.com/api
   ```

2. **Redeploy frontend**
   ```
   Deployments → Latest → Redeploy
   ```

3. **Check backend environment**
   ```
   Render Dashboard → Service → Settings → Environment
   FRONTEND_URL = https://your-app.vercel.app
   ```

4. **Test backend is running**
   ```bash
   curl https://todo-api-xyz123.onrender.com/health
   ```

### Issue: Tasks not saving

**Cause:** API endpoint unreachable

**Debug:**
1. Open browser DevTools (F12)
2. Network tab
3. Try adding task
4. Look for failed network request
5. Click it, see error message
6. Check `VITE_API_URL` is correct

**Common mistakes:**
- `http://` instead of `https://`
- Missing `/api` at end
- Wrong backend URL

### Issue: Dark mode not working or styling broken

**Cause:** CSS Module not importing

**Fix:**
```bash
cd frontend

# Clear build cache
rm -rf .next dist build

# Reinstall
npm install

# Rebuild
npm run build

git add .
git commit -m "Clear build cache"
git push
```

### Issue: "Deploy hook failed"

**Cause:** Vercel trying to redeploy but something wrong

**Fix:**
1. Verify code locally: `npm run build`
2. Push fixes to GitHub
3. Vercel Dashboard → Deployments → Redeploy

---

## Updates & Redeployment

### Automatic Redeployment

When you push to GitHub, Vercel automatically redeploys:

```bash
# Make changes
# ...

# Push to GitHub
git add .
git commit -m "Update component"
git push origin main

# Vercel automatically:
# 1. Pulls new code
# 2. Runs build
# 3. Deploys
```

**Watch deployment:**
- Vercel Dashboard → Deployments tab → See progress

### Manual Redeployment

If you need to redeploy without code changes:

1. Dashboard → Project
2. Deployments tab
3. Find latest deployment
4. Click "..." menu
5. Select "Redeploy"

### Previewing Changes Before Merging

Create preview deployments (optional):

1. Create feature branch locally
2. Push to GitHub
3. Vercel creates preview URL automatically
4. Test changes
5. Merge to main when ready

---

## Custom Domain

### Add Custom Domain

1. Vercel Dashboard → Project Settings
2. Click "Domains"
3. Enter your domain name (e.g., `todo.yourname.com`)
4. Click "Add Domain"

### Configure DNS

Vercel shows instructions based on your domain registrar:

**For most registrars:**
1. Log into domain registrar
2. Find DNS settings
3. Add CNAME record:
   ```
   Name: todo
   Value: cname.vercel-dns.com
   ```
4. Wait 5-30 minutes for DNS to propagate

### Verify Domain

1. Vercel shows status (pending → valid)
2. Visit your custom domain
3. Should work same as `vercel.app` URL

---

## Performance Optimization

### Check Lighthouse Score

Vercel provides Lighthouse insights:

1. Analytics tab → Web Vitals
2. Optimized React app typically gets 90+

### Cache Static Assets

Vercel automatically caches:
- JavaScript bundles
- CSS files
- Images
- Fonts

**No configuration needed!**

### Reduce Bundle Size

If performance is slow:

```bash
# Analyze bundle size
npm run build -- --analyze

# Look for large dependencies
# Consider alternatives:
# - lodash → lodash-es
# - moment → date-fns
```

---

## Monitoring & Logging

### View Logs

```
Dashboard → Deployments → [Deployment] → Logs
```

Logs show:
- Build process
- Environment variables used
- Errors during build
- Performance metrics

### Check Web Vitals

```
Dashboard → Analytics → Web Vitals
```

Shows:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)

---

## Production Checklist

Before going live:

✅ API URL correct in environment  
✅ Backend running and accessible  
✅ Can create tasks  
✅ Can view tasks  
✅ Can edit tasks  
✅ Can delete tasks  
✅ Can see statistics  
✅ Dark mode works  
✅ Mobile responsive  
✅ Error messages display well  
✅ No console errors  

---

## Rollback to Previous Deployment

If something breaks:

1. Dashboard → Deployments
2. Find previous working deployment
3. Click "..." menu
4. Select "Promote to Production"
5. Instantly reverts to that version

---

## Useful Commands

### Local Testing Before Deploy

```bash
cd frontend

# Build locally
npm run build

# Preview build locally
npm run preview
# Opens http://localhost:5173

# Test with backend
# Make sure backend is running
curl http://localhost:5000/health
```

### Check Environment Variables

```
Vercel Dashboard → Project Settings → Environment Variables
```

### Redeploy Without Code Change

```
Dashboard → Deployments → [Latest] → ... → Redeploy
```

---

## Costs

### Free Tier (Perfect for Learning)

- Vercel: ✅ Free (includes unlimited deployments)
- Custom domain: ✅ Free
- SSL certificate: ✅ Free
- CDN: ✅ Free (worldwide)

**Total:** **$0/month**

### Pro Tier (if needed later)

- Vercel Pro: ~$20/month
- Custom analytics
- Priority support
- More serverless functions

---

## Next Steps

1. ✅ Deploy frontend to Vercel
2. ✅ Configure backend URL
3. ✅ Test full integration
4. → Set up custom domain (optional)
5. → Configure monitoring
6. → Share with others!

---

## Support

### Vercel Docs
- [Deploying Next.js/React](https://vercel.com/docs/frameworks/react)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Troubleshooting](https://vercel.com/docs/troubleshooting)

### Community Help
- [Vercel Discussions](https://github.com/vercel/vercel/discussions)
- [GitHub Issues](https://github.com/)

---

## Cheat Sheet

```bash
# Quick reference

# Get project URL
https://your-project.vercel.app

# Test locally before deploy
npm run build
npm run preview

# Push to GitHub (auto-deploys)
git push origin main

# Manual redeploy
Dashboard → Deployments → Redeploy

# View environment variables
Dashboard → Settings → Environment Variables

# View logs
Dashboard → Deployments → [Latest] → Logs

# Rollback if broken
Dashboard → Deployments → [Previous] → Promote
```

---

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Build failed | Check `npm run build` works locally |
| API not responding | Verify `VITE_API_URL` environment variable |
| CORS errors | Check backend `FRONTEND_URL` setting |
| Page not loading | Check root directory is `frontend/` |
| Styling broken | Clear cache: `rm -rf dist` then rebuild |
| Old version showing | Click Redeploy or wait 30 seconds |

---

**Congratulations!** Your frontend is now live! 🚀

### Share Your App

```
You can now share: https://your-app.vercel.app
With anyone, anywhere, anytime!
```

---

## Integration Test

After both frontend and backend are deployed:

1. Open `https://your-app.vercel.app`
2. Create a task
3. Should appear instantly
4. Refresh page
5. Task still there (saved in database!)
6. View statistics
7. Numbers should update

**If all works:** Congratulations! Full-stack app deployed! 🎉

---

**Need Help?** Check logs, test locally, verify environment variables!
