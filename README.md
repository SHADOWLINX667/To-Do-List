# Todo List Application

A production-ready full-stack task management application built with React, Express.js, and PostgreSQL.

## Features

✨ **Modern UI**
- Minimal, clean design inspired by Linear, Notion, and Todoist
- Light and dark mode with persistent preference
- Fully responsive (mobile, tablet, desktop)

📋 **Task Management**
- Create, read, update, delete tasks
- Task categories (Personal, Work, Health, Study, Finance)
- Priority levels (Low, Medium, High)
- Due dates with smart formatting
- Search and filter capabilities
- Sort by multiple criteria
- Completion tracking

📊 **Analytics Dashboard**
- 8 summary cards with key metrics
- 5 interactive charts (completion, categories, weekly, monthly, priority)
- Smart insights and trends
- Real-time statistics

🎯 **User Experience**
- Optimistic UI updates
- Smooth animations and transitions
- Loading states and skeletons
- Error handling
- Empty states
- Accessibility features

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Chart.js
- CSS Modules
- React Icons

### Backend
- Node.js
- Express.js
- Prisma ORM
- Zod validation
- Helmet (security)
- CORS

### Database
- PostgreSQL (Neon)

## Project Structure

```
TO-DO-LIST/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/       # Reusable components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── task/         # Task components
│   │   │   └── statistics/   # Chart components
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API services
│   │   ├── utils/            # Utilities
│   │   └── index.css         # Global styles
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── controllers/
    ├── routes/
    ├── services/
    ├── validators/
    ├── middleware/
    ├── database/
    ├── prisma/
    │   └── schema.prisma
    ├── app.js
    ├── server.js
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (local or Neon)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/todo_db"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

5. Set up database:
```bash
npm run migrate
```

6. Start development server:
```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Configure environment variables:
```env
VITE_API_URL=http://localhost:5000/api
```

5. Start development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks with filters
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/complete` - Toggle completion

### Statistics
- `GET /api/statistics` - Get comprehensive statistics

## Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable:
   ```
   VITE_API_URL=https://your-backend.render.com/api
   ```
4. Deploy

### Backend (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables:
   ```
   DATABASE_URL=your-neon-connection-string
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   ```
4. Deploy

### Database (Neon)

1. Create PostgreSQL database on Neon
2. Get connection string
3. Use as `DATABASE_URL` in backend `.env`

## Development

### Running Both Services

Terminal 1 (Backend):
```bash
cd backend && npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend && npm run dev
```

### Database Management

View database:
```bash
cd backend && npm run studio
```

Create migration:
```bash
cd backend && npm run migrate
```

## Performance Optimizations

- Code splitting with React Router
- Lazy loading components
- Debounced search
- Pagination (20 items per page)
- Database indexing on key columns
- CSS Modules for scoped styling
- Memoization of components

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation support
- High contrast colors
- Focus indicators
- Form validation messages

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Environment Variables

### Frontend
- `VITE_API_URL` - Backend API base URL

### Backend
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `FRONTEND_URL` - Frontend URL for CORS

## Security

- Helmet for HTTP headers
- CORS configuration
- Rate limiting
- Input validation with Zod
- No hardcoded secrets
- Environment variables for sensitive data

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

MIT

## Support

For issues and questions, please open a GitHub issue.
