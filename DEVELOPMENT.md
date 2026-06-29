# Development Guide

Guidelines and best practices for developing the Todo Application.

## Project Architecture

### Frontend Architecture

```
Components Hierarchy:
App
├── Layout
│   ├── Header
│   ├── Sidebar
│   ├── MainContent
│   └── BottomNav (mobile)
└── Pages
    ├── Home
    │   ├── FilterBar
    │   ├── TaskList
    │   │   └── TaskCard (x many)
    │   ├── TaskModal
    │   └── DeleteConfirmModal
    └── Statistics
        ├── StatisticsCards
        ├── CompletionChart
        ├── CategoryChart
        ├── WeeklyChart
        ├── MonthlyChart
        └── PriorityChart
```

### Backend Architecture

```
Request Flow:
Client → Routes → Controllers → Services → Database
         ↓
      Middleware
      (Validation, Error Handling)
```

## Code Standards

### Naming Conventions

**Components:**
```jsx
// PascalCase for component files
// src/components/task/TaskCard.jsx
function TaskCard() { ... }

// kebab-case for style modules
// src/components/task/TaskCard.module.css
.taskCard { ... }
```

**Variables & Functions:**
```javascript
// camelCase for variables and functions
const taskList = [];
function getTaskById(id) { ... }
```

**Constants:**
```javascript
// UPPER_SNAKE_CASE for constants
const MAX_TASKS_PER_PAGE = 20;
const API_URL = 'http://localhost:5000/api';
```

**CSS Classes:**
```css
/* kebab-case for CSS class names */
.task-card { ... }
.task-card-title { ... }
```

### Frontend Component Structure

```jsx
import { useState, useEffect } from 'react';
import { FiIcon } from 'react-icons/fi';
import ComponentA from '../path/ComponentA';
import styles from './MyComponent.module.css';
import { useCustomHook } from '../../hooks/useCustomHook';
import { helperFunction } from '../../utils/helpers';

// Types/constants at top
const DEFAULT_VALUE = 'value';

// Main component
function MyComponent({ prop1, prop2 }) {
  // State
  const [state, setState] = useState(null);
  
  // Custom hooks
  const { data, loading } = useCustomHook();
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Handlers
  const handleClick = () => { ... };
  
  // Render
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}

export default MyComponent;
```

### Backend Route Structure

```javascript
// routes/example.js
import express from 'express';
import { getHandler, createHandler } from '../controllers/exampleController.js';

const router = express.Router();

router.get('/', getHandler);
router.post('/', createHandler);

export default router;
```

## Git Workflow

### Commit Messages

```
Format: <type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- refactor: Code refactor
- style: Styling changes
- docs: Documentation
- perf: Performance improvement
- test: Test addition/update
- chore: Build, dependency updates

Examples:
feat(task): add task categories
fix(modal): close on backdrop click
docs(readme): update deployment instructions
```

### Branch Naming

```
feature/task-categories
bugfix/modal-close-issue
docs/deployment-guide
refactor/api-service
```

## Database Development

### Adding a New Field

1. Update `backend/prisma/schema.prisma`:
```prisma
model Task {
  id         String   @id @default(cuid())
  title      String
  newField   String   // Add new field
  createdAt  DateTime @default(now())
}
```

2. Create migration:
```bash
npm run migrate:dev
```

3. Name the migration descriptively:
```
add_new_field_to_task
```

4. Update TypeScript types if used
5. Update API validators
6. Update components as needed

### Querying Database

```javascript
// In service files
import prisma from '../database/db.js';

// Get with filters
const tasks = await prisma.task.findMany({
  where: {
    completed: false,
    category: 'Work'
  },
  orderBy: {
    createdAt: 'desc'
  },
  take: 20,
  skip: 0
});

// Get one
const task = await prisma.task.findUnique({
  where: { id: taskId }
});

// Create
const newTask = await prisma.task.create({
  data: { title, category, priority }
});

// Update
const updated = await prisma.task.update({
  where: { id },
  data: { completed: true }
});

// Delete
await prisma.task.delete({
  where: { id }
});
```

## API Development

### Adding a New Endpoint

1. Create controller method:
```javascript
// controllers/exampleController.js
export const newHandler = async (req, res, next) => {
  try {
    // Logic here
    res.json({ data });
  } catch (err) {
    next(err);
  }
};
```

2. Add route:
```javascript
// routes/example.js
router.get('/new', newHandler);
```

3. Add to app.js:
```javascript
import exampleRoutes from './routes/example.js';
app.use('/api/example', exampleRoutes);
```

4. Test endpoint:
```bash
curl http://localhost:5000/api/example/new
```

### Error Handling

```javascript
// Throw error with status
const error = new Error('Resource not found');
error.status = 404;
throw error;

// Error middleware will catch and respond
```

## Frontend Development

### Adding a New Page

1. Create page component:
```javascript
// src/pages/NewPage.jsx
import styles from './NewPage.module.css';

function NewPage() {
  return <div className={styles.page}>Content</div>;
}

export default NewPage;
```

2. Add route in App.jsx:
```javascript
import NewPage from './pages/NewPage';

// In Routes:
<Route path="/new-page" element={<NewPage />} />
```

3. Add navigation link in Header or Sidebar

### Adding a New Component

1. Create component and styles:
```javascript
// src/components/category/NewComponent.jsx
import styles from './NewComponent.module.css';

function NewComponent({ prop }) {
  return <div className={styles.component}>{prop}</div>;
}

export default NewComponent;
```

2. Use in pages or other components
3. Keep components small and reusable

### Working with APIs

```javascript
// In services/api.js
export const tasksAPI = {
  getAll: (params) => axiosInstance.get('/tasks', { params }),
  create: (data) => axiosInstance.post('/tasks', data),
};

// In components
import { tasksAPI } from '../services/api';

const { tasks, createTask } = useTasks();
```

## Testing Strategy

### Frontend Testing

```javascript
// src/components/Button.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});

test('calls onClick when clicked', async () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  await userEvent.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### API Testing

```bash
# Test endpoint
curl -X GET http://localhost:5000/api/tasks

# With parameters
curl "http://localhost:5000/api/tasks?completed=false&sort=priority"

# POST request
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","category":"Personal"}'
```

## Performance Tips

### Frontend

1. **Use React.memo for expensive components:**
```javascript
const TaskCard = React.memo(function TaskCard({ task }) {
  return <div>{task.title}</div>;
});
```

2. **Lazy load routes:**
```javascript
const Statistics = lazy(() => import('./pages/Statistics'));
```

3. **Debounce search:**
```javascript
const [searchQuery, setSearchQuery] = useState('');

const handleSearch = useCallback(
  debounce((query) => {
    // Search logic
  }, 500),
  []
);
```

### Backend

1. **Use database indexes:**
```prisma
@@index([createdAt])
@@index([completed])
```

2. **Optimize queries:**
```javascript
// ✓ Good - only select needed fields
const tasks = await prisma.task.findMany({
  select: { id: true, title: true, completed: true }
});

// ✗ Avoid - selecting all fields
const tasks = await prisma.task.findMany();
```

3. **Implement pagination:**
```javascript
const { skip, take } = getPaginationParams(page, limit);
const tasks = await prisma.task.findMany({ skip, take });
```

## Debugging

### Frontend Debugging

1. **Browser DevTools:**
   - F12 → Console for logs
   - Network tab for API calls
   - React DevTools extension

2. **Add console logs:**
```javascript
console.log('Data:', data);
console.error('Error:', error);
```

3. **Use debugger statement:**
```javascript
debugger;  // Execution pauses here in DevTools
```

### Backend Debugging

1. **Check logs:**
```bash
npm run dev  # See output in terminal
```

2. **Add logging:**
```javascript
console.log('Query:', where);
console.error('Database error:', err);
```

3. **Test endpoints:**
```bash
# Use curl or Postman
curl http://localhost:5000/api/tasks
```

## Useful Commands

### Frontend
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview build
npm install          # Install dependencies
npm update           # Update dependencies
```

### Backend
```bash
npm run dev          # Development server
npm run migrate      # Run migrations
npm run studio       # Open Prisma Studio
npm install          # Install dependencies
npm update           # Update dependencies
```

## Environment Variables

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env.local)
```
DATABASE_URL=postgresql://user:password@localhost:5432/todo_db
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Common Tasks

### Update a Task Status

```javascript
// Frontend
const handleToggle = async (taskId) => {
  await tasksAPI.toggleComplete(taskId);
  refetchTasks();
};

// Backend
router.patch('/:id/complete', async (req, res) => {
  const task = await prisma.task.findUnique({
    where: { id: req.params.id }
  });
  
  const updated = await prisma.task.update({
    where: { id: req.params.id },
    data: { completed: !task.completed }
  });
  
  res.json(updated);
});
```

### Add a New Task Category

1. Update `utils/categoryUtils.js`:
```javascript
export const defaultCategories = [
  'Personal',
  'Work',
  'Health',
  'Study',
  'Finance',
  'NewCategory'  // Add here
];

export const categoryColors = {
  NewCategory: '#NEW_HEX_COLOR'
};
```

2. Update form options in TaskModal.jsx (automatic via defaultCategories)

## Troubleshooting

### Common Errors

**Error: Cannot find module**
```bash
npm install
npm ci  # Clean install
```

**CORS Error**
- Check FRONTEND_URL in backend .env
- Ensure frontend URL matches

**Database Connection Error**
- Verify DATABASE_URL is correct
- Check if database service is running
- Test connection: `psql your_connection_string`

**Port Already in Use**
```bash
# Find process using port
lsof -i :5000
kill -9 <PID>
```

## Resources

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Chart.js Docs](https://www.chartjs.org/docs/latest)
- [Vite Docs](https://vitejs.dev)

## Questions?

Check existing code for patterns and examples!
