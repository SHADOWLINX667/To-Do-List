# Deployment Guide

Complete guide to deploy the Todo Application to production.

## Prerequisites

- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- Neon account (for database)
- Git installed locally

## Database Setup (Neon PostgreSQL)

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Get the connection string:
   ```
   postgresql://[user]:[password]@[host]/[database]
   ```
4. Keep this for later use

## Backend Deployment (Render)

### 1. Prepare Backend

Ensure your backend code is pushed to GitHub:
```bash
cd backend
git add .
git commit -m "Deploy backend"
git push
```

### 2. Create Render Service

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the repository
5. Configure:
   - **Name**: `todo-api`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Region**: Choose closest to you

### 3. Set Environment Variables

In Render dashboard:
1. Go to your Web Service
2. Click "Environment"
3. Add variables:
   ```
   DATABASE_URL=your_neon_connection_string
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   PORT=5000
   ```

### 4. Deploy

Click "Create Web Service" and wait for deployment.
Your backend URL will be: `https://todo-api-xxxxx.onrender.com`

## Frontend Deployment (Vercel)

### 1. Prepare Frontend

Ensure your frontend code is pushed to GitHub:
```bash
cd frontend
git add .
git commit -m "Deploy frontend"
git push
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Import GitHub repository
4. Select the repository
5. Configure:
   - **Framework**: `React`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`

### 3. Set Environment Variables

In Vercel project settings:
1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

### 4. Deploy

Click "Deploy" and wait for build to complete.
Your frontend URL will be assigned automatically.

## Verification

### Backend Health Check

```bash
curl https://your-backend-url.onrender.com/health
```

Should return: `{"status":"OK"}`

### Test API

```bash
curl https://your-backend-url.onrender.com/api/tasks
```

### Test Frontend

Visit: `https://your-frontend.vercel.app`

## Post-Deployment

### 1. Update Backend URL

If frontend is deployed first, update the backend `FRONTEND_URL`:
1. Go to Render dashboard
2. Update environment variable with actual frontend URL

### 2. Enable Database Backups

In Neon dashboard:
1. Go to your project
2. Click "Backups"
3. Enable automatic backups

### 3. Monitor

**Render Dashboard**:
- Check logs: "Logs" tab
- Monitor metrics: "Metrics" tab

**Vercel Dashboard**:
- Check build logs
- Monitor analytics
- Set up error tracking

## Troubleshooting

### Database Connection Error

```
Error: Error connecting to database
```

**Solution**:
1. Verify DATABASE_URL is correct
2. Ensure IP is whitelisted in Neon (should be automatic)
3. Test connection locally with the same URL

### CORS Errors

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution**:
1. Verify FRONTEND_URL is correct in backend
2. Ensure frontend URL is using HTTPS
3. Clear browser cache and restart

### Build Failures

1. Check build logs in Vercel/Render
2. Ensure all dependencies are listed in package.json
3. Verify environment variables are set
4. Test build locally: `npm run build`

### Slow Performance

1. Check database indexes: `npm run studio`
2. Enable pagination (default 20 items)
3. Optimize images
4. Check API response times

## Rollback

### Vercel Rollback
1. Go to "Deployments"
2. Find previous deployment
3. Click "Promote to Production"

### Render Rollback
1. Go to "Events"
2. Find previous deployment
3. Click "Redeploy"

## Updating Production

### Update Backend

```bash
cd backend
git add .
git commit -m "Update backend"
git push
```

Render auto-redeploys on push.

### Update Frontend

```bash
cd frontend
git add .
git commit -m "Update frontend"
git push
```

Vercel auto-redeploys on push.

## Custom Domain

### Vercel Custom Domain

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS configuration steps

### Render Custom Domain

1. Go to Web Service settings
2. Click "Custom Domain"
3. Add your domain
4. Follow DNS configuration steps

## Monitoring & Maintenance

### Weekly Tasks
- Check error logs
- Monitor API response times
- Review user feedback

### Monthly Tasks
- Review database growth
- Optimize slow queries
- Update dependencies

### Quarterly Tasks
- Security audit
- Performance review
- Backup verification

## Support

For issues:
1. Check deployment logs
2. Review error messages
3. Test locally
4. Contact support teams:
   - Neon: support@neon.tech
   - Render: support@render.com
   - Vercel: support@vercel.com
