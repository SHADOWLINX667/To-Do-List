# Todo Backend API

A production-ready REST API for the Todo application built with Express.js and PostgreSQL.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Set up database (Neon PostgreSQL):
```bash
npm run migrate
```

4. Run development server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks with filtering, sorting, and pagination
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/complete` - Toggle task completion status

### Statistics
- `GET /api/statistics` - Get comprehensive statistics and analytics

### Query Parameters
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
- `sort` - Sort by: newest, oldest, priority, dueDate, alphabetically
- `completed` - Filter by completion status: true, false
- `category` - Filter by category
- `priority` - Filter by priority: low, medium, high
- `search` - Search in title, description, category

## Environment Variables

```env
DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Deployment

### Render.com
1. Connect GitHub repository
2. Select Node.js as runtime
3. Set environment variables
4. Deploy

## Project Structure

```
backend/
├── controllers/      # Request handlers
├── routes/          # API routes
├── services/        # Business logic
├── middleware/      # Express middleware
├── validators/      # Input validation
├── database/        # Database connection
├── prisma/          # Prisma schema and migrations
├── app.js           # Express app setup
├── server.js        # Server entry point
└── package.json
```
