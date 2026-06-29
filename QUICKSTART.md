# Quick Start Guide

Get the Todo Application running in 5 minutes!

## Requirements

- Node.js v18+
- PostgreSQL (local or online)
- npm or yarn

## Step 1: Clone & Setup

```bash
# Navigate to project directory
cd TO-DO-LIST

# Backend setup
cd backend
npm install

# Frontend setup (in new terminal)
cd frontend
npm install
```

## Step 2: Configure Database

### Option A: Local PostgreSQL

```bash
# Install PostgreSQL if not already installed
# macOS: brew install postgresql
# Windows: download from postgresql.org
# Linux: sudo apt-get install postgresql

# Start PostgreSQL service
# macOS: brew services start postgresql
# Windows: pgAdmin or Services
# Linux: sudo systemctl start postgresql

# Create database
createdb todo_db

# Update backend/.env.local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/todo_db"
```

### Option B: Neon Cloud Database

1. Go to [neon.tech](https://neon.tech)
2. Create free account
3. Create new project
4. Copy connection string
5. Update backend/.env.local:
   ```
   DATABASE_URL=your_neon_connection_string
   ```

## Step 3: Run Database Migration

```bash
cd backend
npm run migrate
```

## Step 4: Start Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms

Local:    http://localhost:5173/
```

## Step 5: Open Application

1. Open browser
2. Go to `http://localhost:5173`
3. Start creating tasks!

## First Steps

### Create a Task
1. Click "Add Task" button
2. Fill in:
   - **Title**: "My first task"
   - **Description**: (optional)
   - **Category**: Personal
   - **Priority**: Medium
   - **Due Date**: (optional)
3. Click "Save Task"

### Complete a Task
1. Click checkbox on a task card
2. Task gets marked as completed
3. See progress update

### View Statistics
1. Click "Statistics" in navigation
2. See dashboard with:
   - Summary cards
   - Charts and graphs
   - Insights

### Filter Tasks
1. Use filter buttons (All, Active, Completed)
2. Try sort options
3. Search by title or category

## Common Issues

### Port Already in Use

If port 5000 or 5173 is taken:

**Backend:**
```bash
# Change port in backend/.env.local
PORT=5001
```

**Frontend:**
```bash
# Change port in vite.config.js
server: {
  port: 5174,
}
```

### Database Connection Error

```bash
# Verify connection string
# Test connection
psql "your_connection_string"
```

### API Not Responding

1. Check backend is running on port 5000
2. Verify CORS is enabled
3. Check frontend `.env.local` has correct API URL

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Development Tips

### Database Management

```bash
# View database in Prisma Studio
npm run studio

# Create new migration
npm run migrate:dev

# Reset database (careful!)
npx prisma migrate reset
```

### Browser DevTools

1. Open DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for API calls
4. Check Application tab for localStorage

### Hot Reload

Both frontend and backend support hot reload:
- Edit files and they reload automatically
- No need to restart servers

## File Structure Quick Reference

```
Backend:
- backend/server.js          → Entry point
- backend/app.js             → Express app
- backend/controllers/       → Request handlers
- backend/routes/            → API routes
- backend/services/          → Business logic
- backend/prisma/schema.prisma → Database schema

Frontend:
- frontend/src/main.jsx      → Entry point
- frontend/src/App.jsx       → Root component
- frontend/src/pages/        → Page components
- frontend/src/components/   → Reusable components
- frontend/src/hooks/        → Custom hooks
- frontend/src/services/api.js → API calls
```

## Next Steps

### To Learn More
- Read [README.md](./README.md) for full documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Explore component code for best practices

### To Customize
- Update colors in `frontend/src/index.css`
- Add new categories in `frontend/src/utils/categoryUtils.js`
- Modify task fields in `backend/prisma/schema.prisma`

### To Deploy
- Follow [DEPLOYMENT.md](./DEPLOYMENT.md)
- Need help? Check Troubleshooting section

## Support

### Documentation
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Deployment: `DEPLOYMENT.md`

### Test the API

```bash
# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","category":"Personal","priority":"medium"}'

# Get all tasks
curl http://localhost:5000/api/tasks

# Get statistics
curl http://localhost:5000/api/statistics
```

### Health Check

```bash
# Backend health
curl http://localhost:5000/health

# Should return: {"status":"OK"}
```

## Performance

Initial load should be instant. If slow:

1. Clear browser cache (Ctrl+Shift+Delete)
2. Check database connection
3. Verify no other services using same ports
4. Check system resources (CPU, RAM, disk)

## Security Notes

⚠️ **Development Only**: 
- `.env.local` files contain dev credentials
- Never commit `.env` files with secrets
- Use proper secrets management in production

## Success! 🎉

Your Todo Application is now running!

### You can:
✓ Create, edit, delete tasks
✓ Filter and search tasks
✓ View analytics dashboard
✓ Track completion progress
✓ Organize by categories
✓ Set priorities and due dates

### Next: Deploy to Production

When ready, follow [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to:
- Frontend: Vercel
- Backend: Render
- Database: Neon

Happy task management! 📝
