# Backend - Detailed Developer Guide

This guide explains every file in the backend, how it works, and how to extend it. Perfect for junior developers learning server-side development!

## Table of Contents

1. [Project Setup](#project-setup)
2. [Folder Structure Explained](#folder-structure-explained)
3. [Entry Point](#entry-point)
4. [Express App Configuration](#express-app-configuration)
5. [Middleware Explained](#middleware-explained)
6. [Routing System](#routing-system)
7. [Controllers](#controllers)
8. [Services](#services)
9. [Validators](#validators)
10. [Database Connection](#database-connection)
11. [Prisma ORM](#prisma-orm)
12. [Request-Response Flow](#request-response-flow)
13. [Error Handling](#error-handling)
14. [Testing Endpoints](#testing-endpoints)

---

## Project Setup

### What is Node.js?

Node.js allows JavaScript to run on servers (not just browsers):

- **Server-side JavaScript** - Same language on frontend and backend
- **Non-blocking I/O** - Handles many requests efficiently
- **npm ecosystem** - Thousands of libraries available

### Running the Project

```bash
# Install dependencies (one time only)
npm install

# Start development server with auto-reload
npm run dev

# Start production server
npm start
```

### File: `package.json`

Configuration for your Node.js project:

```json
{
  "name": "todo-backend",
  "version": "1.0.0",
  "type": "module",  // Use ES6 imports instead of require()
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",  // Auto-restart on file changes
    "migrate": "prisma migrate dev",
    "migrate:prod": "prisma migrate deploy",
    "studio": "prisma studio"
  },
  "dependencies": {
    "express": "^4.18.2",      // Web framework
    "prisma": "^5.11.0",        // ORM for database
    "@prisma/client": "^5.11.0",// Prisma client
    "zod": "^3.22.4",           // Input validation
    "helmet": "^7.1.0",         // Security headers
    "cors": "^2.8.5",           // Cross-origin requests
    "dotenv": "^16.3.1"         // Environment variables
  }
}
```

---

## Folder Structure Explained

### Root Files

```
backend/
├── server.js              # Entry point (starts server)
├── app.js                 # Express app setup
├── package.json           # Dependencies
├── .env.example           # Template for .env
└── .env.local             # Your secrets (git-ignored)
```

### Main Folders

```
controllers/       # Handle HTTP requests
routes/           # Define URL routes
services/         # Business logic
middleware/       # Request processing
validators/       # Input validation
database/         # DB connection
prisma/           # ORM schema & migrations
```

---

## Entry Point

### `server.js`

Starts the Express server:

```javascript
import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**What it does:**
1. Imports the Express app
2. Reads PORT from `.env` (or defaults to 5000)
3. Starts listening for HTTP requests
4. Logs that server is running

**Key concept:** `app` contains all the routes and middleware. This file just starts it!

---

## Express App Configuration

### `app.js`

Sets up the Express application:

```javascript
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';

import taskRoutes from './routes/tasks.js';
import statisticsRoutes from './routes/statistics.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// ============ SECURITY ============

// Helmet - Set security HTTP headers
// Protects against XSS, clickjacking, etc.
app.use(helmet());

// CORS - Allow frontend to access this backend
// Only allows requests from FRONTEND_URL
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true  // Allow cookies
}));

// Rate Limiting - Prevent abuse
// Max 100 requests per IP per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100  // Max requests
});
app.use(limiter);

// ============ BODY PARSING ============

// Parse JSON request bodies
app.use(express.json());

// Parse form-encoded bodies
app.use(express.urlencoded({ extended: true }));

// ============ ROUTES ============

// All routes are prefixed with /api
app.use('/api/tasks', taskRoutes);
app.use('/api/statistics', statisticsRoutes);

// ============ HEALTH CHECK ============

// Simple endpoint to check if server is running
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Debug endpoint to check configuration
app.get('/debug', (req, res) => {
  res.json({
    nodeEnv: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL ? 'Connected' : 'Missing',
    port: process.env.PORT,
  });
});

// ============ ERROR HANDLING ============

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler (catches errors from routes)
app.use(errorHandler);

export default app;
```

**Middleware Order Matters!**

Middleware runs in order:

```
Request arrives
        ↓
Helmet (security)
        ↓
CORS (allowed origins)
        ↓
Rate limiter (rate limit check)
        ↓
Body parser (parse JSON)
        ↓
Routes (handle request)
        ↓
404 handler (unknown route)
        ↓
Error handler (catch errors)
        ↓
Response sent
```

---

## Middleware Explained

Middleware are functions that process requests before they reach routes.

### `middleware/errorHandler.js`

Central error handling for all routes:

```javascript
export const errorHandler = (err, req, res, next) => {
  // Log error to console
  console.error('❌ Error:', err.message);
  console.error('Stack:', err.stack);

  // Handle Zod validation errors
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors
    });
  }

  // Handle 404 errors
  if (err.status === 404) {
    return res.status(404).json({ error: 'Not found' });
  }

  // Handle database connection errors
  if (err.code === 'P1000' || err.code === 'P1001') {
    return res.status(503).json({
      error: 'Database connection error',
      message: 'Unable to connect to database'
    });
  }

  // Default error response
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    code: err.code
  });
};
```

**How to use:**

```javascript
// In a controller, throw an error
export const getTask = async (req, res, next) => {
  try {
    const task = await prisma.task.findUnique({...});
    if (!task) {
      const error = new Error('Task not found');
      error.status = 404;
      throw error;  // Caught by errorHandler
    }
    res.json(task);
  } catch (err) {
    next(err);  // Pass to errorHandler
  }
};
```

---

## Routing System

### What are Routes?

Routes map URLs to functions that handle requests.

```
GET  /api/tasks          → getAll tasks
GET  /api/tasks/:id      → getOne task
POST /api/tasks          → createOne task
PUT  /api/tasks/:id      → updateOne task
DELETE /api/tasks/:id    → deleteOne task
PATCH /api/tasks/:id/complete → toggleOne task
```

### `routes/tasks.js`

Defines all task-related endpoints:

```javascript
import express from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete
} from '../controllers/taskController.js';

const router = express.Router();

// GET /api/tasks
router.get('/', getAllTasks);

// GET /api/tasks/123
router.get('/:id', getTaskById);

// POST /api/tasks (with JSON body)
router.post('/', createTask);

// PUT /api/tasks/123 (with JSON body)
router.put('/:id', updateTask);

// DELETE /api/tasks/123
router.delete('/:id', deleteTask);

// PATCH /api/tasks/123/complete
router.patch('/:id/complete', toggleTaskComplete);

export default router;
```

**Route Parameters:**

```javascript
// /:id means "any URL segment here is the id"
// /api/tasks/123      → id = "123"
// /api/tasks/abc      → id = "abc"

router.get('/:id', (req, res) => {
  console.log(req.params.id);  // Access the id
});
```

### `routes/statistics.js`

Statistics endpoint:

```javascript
import express from 'express';
import { getStatistics } from '../controllers/statisticsController.js';

const router = express.Router();

// GET /api/statistics
router.get('/', getStatistics);

export default router;
```

---

## Controllers

Controllers handle HTTP requests and return responses.

### Controller Flow

```
Request arrives
        ↓
Controller function called
        ↓
Extract data from request
        ↓
Validate input
        ↓
Call service layer
        ↓
Send response back
```

### `controllers/taskController.js`

Handles all task-related requests:

```javascript
import taskService from '../services/taskService.js';
import { validateCreateTask, validateUpdateTask } from '../validators/taskValidator.js';

// GET /api/tasks?page=1&completed=false&sort=priority
export const getAllTasks = async (req, res, next) => {
  try {
    // Get query parameters from URL
    // req.query = { page: '1', completed: 'false', sort: 'priority' }
    
    // Call service to fetch tasks
    const result = await taskService.getAllTasks(req.query);
    
    // Send JSON response
    res.json(result);
  } catch (err) {
    next(err);  // Pass error to error handler
  }
};

// GET /api/tasks/123
export const getTaskById = async (req, res, next) => {
  try {
    // Get ID from URL path
    const { id } = req.params;  // req.params.id = "123"
    
    // Call service
    const task = await taskService.getTaskById(id);
    
    // Send response
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    // Get body data
    // req.body = { title: "...", category: "...", ... }
    
    // Validate input using Zod
    const data = validateCreateTask(req.body);
    
    // Call service to save
    const task = await taskService.createTask(data);
    
    // Send response with 201 Created status
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// PUT /api/tasks/123
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validate input (some fields optional for update)
    const data = validateUpdateTask(req.body);
    
    // Call service
    const task = await taskService.updateTask(id, data);
    
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/tasks/123
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Call service to delete
    await taskService.deleteTask(id);
    
    // Send 204 No Content (successful delete)
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// PATCH /api/tasks/123/complete
export const toggleTaskComplete = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Call service to toggle
    const task = await taskService.toggleTaskComplete(id);
    
    res.json(task);
  } catch (err) {
    next(err);
  }
};
```

**Key Concepts:**

```javascript
// Request object (req)
req.params   // URL parameters: /tasks/:id
req.query    // Query string: ?page=1&sort=priority
req.body     // JSON data from POST/PUT requests

// Response object (res)
res.json(data)           // Send JSON and end response
res.status(201)          // Set HTTP status code
res.send('text')         // Send plain text
res.send()               // Send empty response

// Common status codes
200  - OK (successful GET/PUT)
201  - Created (successful POST)
204  - No Content (successful DELETE)
400  - Bad Request (invalid input)
404  - Not Found (resource doesn't exist)
500  - Internal Server Error
```

### `controllers/statisticsController.js`

Statistics endpoint:

```javascript
import statisticsService from '../services/statisticsService.js';

// GET /api/statistics
export const getStatistics = async (req, res, next) => {
  try {
    // Call service to calculate all stats
    const stats = await statisticsService.getStatistics();
    
    // Send response
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
```

---

## Services

Services contain **business logic** - the actual work!

Controllers just:
- Extract data from requests
- Call services
- Return responses

Services do:
- Complex logic
- Database queries
- Data calculations

### `services/taskService.js`

All task-related business logic:

```javascript
import prisma from '../database/db.js';

export class TaskService {
  // Get all tasks with filters, sorting, pagination
  async getAllTasks(filters = {}) {
    // Build where clause from filters
    const where = {};

    // Filter by completion status
    if (filters.completed !== undefined) {
      where.completed = filters.completed === 'true' || filters.completed === true;
    }

    // Filter by category
    if (filters.category) {
      where.category = filters.category;
    }

    // Filter by priority
    if (filters.priority) {
      where.priority = filters.priority;
    }

    // Search in title, description, category
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { category: { contains: filters.search, mode: 'insensitive' } }
      ];
    }

    // Build order by clause from sort
    const orderBy = {};
    if (filters.sort === 'newest') {
      orderBy.createdAt = 'desc';  // Newest first
    } else if (filters.sort === 'oldest') {
      orderBy.createdAt = 'asc';   // Oldest first
    } else if (filters.sort === 'priority') {
      orderBy.priority = 'desc';
    } else if (filters.sort === 'dueDate') {
      orderBy.dueDate = 'asc';
    } else if (filters.sort === 'alphabetically') {
      orderBy.title = 'asc';
    } else {
      orderBy.createdAt = 'desc';  // Default to newest
    }

    // Handle pagination
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 20;
    const skip = (page - 1) * limit;  // Skip items for page

    // Fetch tasks and total count in parallel
    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        orderBy,
        skip,
        take: limit
      }),
      prisma.task.count({ where })
    ]);

    // Return tasks and pagination info
    return {
      tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  // Get single task by ID
  async getTaskById(id) {
    const task = await prisma.task.findUnique({
      where: { id }
    });

    // If not found, throw error
    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }

    return task;
  }

  // Create new task
  async createTask(data) {
    return prisma.task.create({
      data
    });
  }

  // Update existing task
  async updateTask(id, data) {
    // Check if task exists first
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }

    // Update and return
    return prisma.task.update({
      where: { id },
      data
    });
  }

  // Delete task
  async deleteTask(id) {
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }

    return prisma.task.delete({
      where: { id }
    });
  }

  // Toggle task completion
  async toggleTaskComplete(id) {
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      const err = new Error('Task not found');
      err.status = 404;
      throw err;
    }

    // Flip the boolean value
    return prisma.task.update({
      where: { id },
      data: { completed: !task.completed }
    });
  }
}

// Export singleton instance
export default new TaskService();
```

### `services/statisticsService.js`

Calculates all statistics:

```javascript
import prisma from '../database/db.js';

export class StatisticsService {
  async getStatistics() {
    // Fetch all data we need
    const [
      totalTasks,
      completedTasks,
      pendingTasks,
      todaysTasks,
      overdueTasks,
      highPriorityTasks,
      tasksCreatedThisWeek,
      allTasks
    ] = await Promise.all([
      prisma.task.count(),
      prisma.task.count({ where: { completed: true } }),
      prisma.task.count({ where: { completed: false } }),
      this.getTodaysTasks(),
      this.getOverdueTasks(),
      prisma.task.count({ where: { priority: 'high', completed: false } }),
      this.getTasksCreatedThisWeek(),
      prisma.task.findMany()  // All tasks for calculations
    ]);

    // Calculate completion rate
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Calculate stats using utility functions
    const categoryStats = this.calculateCategoryStats(allTasks);
    const priorityStats = this.calculatePriorityStats(allTasks);
    const weeklyStats = this.calculateWeeklyStats(allTasks);
    const monthlyStats = this.calculateMonthlyStats(allTasks);
    const insights = this.calculateInsights(allTasks);

    // Return everything
    return {
      summary: {
        totalTasks,
        completedTasks,
        pendingTasks,
        completionRate,
        todaysTasks,
        overdueTasks,
        highPriorityTasks,
        tasksCreatedThisWeek
      },
      categoryStats,
      priorityStats,
      weeklyStats,
      monthlyStats,
      completionTimeline: this.calculateCompletionTimeline(allTasks),
      insights,
      recentActivity: await this.getRecentActivity()
    };
  }

  // Calculate stats per category
  calculateCategoryStats(tasks) {
    const stats = {};

    tasks.forEach(task => {
      if (!stats[task.category]) {
        stats[task.category] = { total: 0, completed: 0 };
      }
      stats[task.category].total++;
      if (task.completed) {
        stats[task.category].completed++;
      }
    });

    // Convert to array with percentage
    return Object.entries(stats).map(([category, data]) => ({
      category,
      ...data,
      percentage: Math.round((data.completed / data.total) * 100)
    }));
  }

  // ... more calculation methods
}

export default new StatisticsService();
```

**Key Concept:** Services don't know about HTTP requests. They're just business logic functions.

---

## Validators

Validators ensure incoming data is valid before processing.

### What is Zod?

Zod is a TypeScript-first schema validation library:

```javascript
// Define shape of data
const schema = z.object({
  title: z.string().min(1, 'Required'),
  age: z.number().min(0)
});

// Validate data
const data = schema.parse({ title: 'Hello', age: 25 });
// If invalid, throws ZodError
```

### `validators/taskValidator.js`

Defines task validation schemas:

```javascript
import { z } from 'zod';

// Schema for creating a task
export const createTaskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title too long'),
  
  description: z.string()
    .optional(),
  
  category: z.string()
    .min(1, 'Category is required')
    .max(50),
  
  priority: z.enum(['low', 'medium', 'high'])
    .default('medium'),
  
  dueDate: z.string()
    .datetime('Invalid date format')
    .optional()
    .nullable()
});

// Schema for updating (everything optional)
export const updateTaskSchema = z.object({
  title: z.string()
    .min(1)
    .max(255)
    .optional(),
  
  description: z.string()
    .optional(),
  
  category: z.string()
    .min(1)
    .max(50)
    .optional(),
  
  priority: z.enum(['low', 'medium', 'high'])
    .optional(),
  
  dueDate: z.string()
    .datetime()
    .optional()
    .nullable(),
  
  completed: z.boolean()
    .optional()
});

// Validation functions that throw errors if invalid
export const validateCreateTask = (data) => {
  return createTaskSchema.parse(data);  // Throws ZodError if invalid
};

export const validateUpdateTask = (data) => {
  return updateTaskSchema.parse(data);
};
```

**How to use:**

```javascript
// In controller
export const createTask = async (req, res, next) => {
  try {
    // This will throw if invalid
    const validatedData = validateCreateTask(req.body);
    
    // If we get here, data is valid
    const task = await taskService.createTask(validatedData);
    res.status(201).json(task);
  } catch (err) {
    // Error handler catches ZodError and sends 400 response
    next(err);
  }
};
```

---

## Database Connection

### `database/db.js`

Creates connection to database:

```javascript
import { PrismaClient } from '@prisma/client';

// Create client instance
const prisma = new PrismaClient({
  log: ['warn', 'error'],  // Only log warnings and errors
});

// Test connection on startup
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);  // Exit if can't connect
  });

export default prisma;
```

**What it does:**
1. Creates Prisma client
2. Tests connection on startup
3. Logs success or failure
4. Exports for use in services

---

## Prisma ORM

### What is Prisma?

Prisma is an ORM (Object-Relational Mapping) that:
- Maps database tables to JavaScript objects
- Provides type-safe queries
- Handles migrations

### `prisma/schema.prisma`

Defines database schema:

```prisma
// Tells Prisma to use PostgreSQL
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Database code generator
generator client {
  provider = "prisma-client-js"
}

// Task table
model Task {
  id          String   @id @default(cuid())
  title       String   @db.VarChar(255)
  description String?  @db.Text
  category    String   @db.VarChar(50)
  priority    String   @db.VarChar(20) @default("medium")
  dueDate     DateTime?
  completed   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Indexes for fast queries
  @@index([createdAt])
  @@index([completed])
  @@index([category])
  @@index([priority])
  @@index([dueDate])
}
```

**Syntax Explained:**

```prisma
model Task {
  // Field definitions
  id        String   @id @default(cuid())
  // └─ name Type   └─ modifiers (database attribute)

  title     String   @db.VarChar(255)
  // └─ name String type with max 255 chars

  description String?
  // └─ Optional field (? = nullable)

  createdAt DateTime @default(now())
  // └─ Defaults to current timestamp

  updatedAt DateTime @updatedAt
  // └─ Auto-updates on every change

  @@index([createdAt])
  // └─ Index for fast queries on this column
}
```

### Prisma Migrations

Migrations track database schema changes:

```bash
# Create migration after changing schema.prisma
npm run migrate

# Run migrations on production
npm run migrate:prod

# View database in UI
npm run studio
```

### Using Prisma in Code

```javascript
import prisma from './database/db.js';

// CREATE - Add new record
await prisma.task.create({
  data: {
    title: 'New task',
    category: 'Work',
    priority: 'high'
  }
});

// READ - Get records
await prisma.task.findMany({
  where: { completed: false },
  orderBy: { createdAt: 'desc' },
  take: 10
});

// READ - Get one record
await prisma.task.findUnique({
  where: { id: '123' }
});

// UPDATE - Change record
await prisma.task.update({
  where: { id: '123' },
  data: { completed: true }
});

// DELETE - Remove record
await prisma.task.delete({
  where: { id: '123' }
});

// COUNT - How many records
await prisma.task.count({
  where: { category: 'Work' }
});
```

---

## Request-Response Flow

Complete example of a request:

```javascript
// 1. FRONTEND SENDS
POST http://localhost:5000/api/tasks
Content-Type: application/json

{
  "title": "Buy groceries",
  "category": "Personal",
  "priority": "medium"
}

// 2. SERVER RECEIVES (in app.js)
app.use(express.json())  // Parse JSON body
                         // Now req.body = { title: "...", ... }

// 3. ROUTER MATCHES (in routes/tasks.js)
router.post('/', createTask)  // Routes to controller

// 4. CONTROLLER HANDLES (in controllers/taskController.js)
export const createTask = async (req, res, next) => {
  // req.body = { title: "...", category: "...", priority: "..." }
  
  const data = validateCreateTask(req.body)  // Validates
  const task = await taskService.createTask(data)  // Saves
  res.status(201).json(task)  // Sends response
}

// 5. SERVICE PROCESSES (in services/taskService.js)
async createTask(data) {
  return prisma.task.create({ data })  // Saves to DB
}

// 6. PRISMA EXECUTES (in database)
INSERT INTO "Task" (id, title, category, priority, ...)
VALUES ('clp1...', 'Buy groceries', 'Personal', 'medium', ...)

// 7. DATABASE RETURNS (PostgreSQL)
{
  id: 'clp1...',
  title: 'Buy groceries',
  category: 'Personal',
  priority: 'medium',
  completed: false,
  createdAt: '2024-06-29...',
  updatedAt: '2024-06-29...'
}

// 8. SERVICE RETURNS

// 9. CONTROLLER SENDS TO CLIENT
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": "clp1...",
  "title": "Buy groceries",
  ...
}

// 10. FRONTEND RECEIVES
const response = await axios.post('/api/tasks', data)
console.log(response.data)  // { id: "clp1...", ... }
```

---

## Error Handling

### Creating Errors

```javascript
// In service
if (!task) {
  const error = new Error('Task not found');
  error.status = 404;
  throw error;
}

// In validator
export const validateCreateTask = (data) => {
  return createTaskSchema.parse(data);
  // Throws ZodError if invalid
};
```

### Catching Errors

```javascript
// In controller
export const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    next(err);  // Pass to error handler
  }
};
```

### Error Handler Processing

```javascript
// errorHandler middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Handle different error types
  if (err.name === 'ZodError') {
    return res.status(400).json({
      error: 'Validation error',
      details: err.errors
    });
  }

  if (err.status === 404) {
    return res.status(404).json({ error: 'Not found' });
  }

  // Generic error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};
```

---

## Testing Endpoints

### Using cURL

```bash
# GET all tasks
curl http://localhost:5000/api/tasks

# GET with query parameters
curl "http://localhost:5000/api/tasks?completed=false&sort=priority"

# GET single task
curl http://localhost:5000/api/tasks/clp1...

# POST - Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title":"Buy groceries",
    "category":"Personal",
    "priority":"medium"
  }'

# PUT - Update task
curl -X PUT http://localhost:5000/api/tasks/clp1... \
  -H "Content-Type: application/json" \
  -d '{
    "completed":true
  }'

# DELETE - Delete task
curl -X DELETE http://localhost:5000/api/tasks/clp1...

# PATCH - Toggle complete
curl -X PATCH http://localhost:5000/api/tasks/clp1.../complete

# GET statistics
curl http://localhost:5000/api/statistics

# Health check
curl http://localhost:5000/health
```

### Using Postman

1. Open Postman
2. Create new request
3. Set method (GET, POST, etc)
4. Set URL (`http://localhost:5000/api/tasks`)
5. Set headers if needed (`Content-Type: application/json`)
6. Set body for POST/PUT requests
7. Click Send

---

## Common Patterns

### Pattern 1: Async/Await Error Handling

```javascript
export const getTask = async (req, res, next) => {
  try {
    // If any await throws, caught below
    const task = await taskService.getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    // Pass error to middleware
    next(err);
  }
};
```

### Pattern 2: Parallel Queries

```javascript
// Fetch multiple things at same time
const [totalTasks, completedTasks, pendingTasks] = await Promise.all([
  prisma.task.count(),
  prisma.task.count({ where: { completed: true } }),
  prisma.task.count({ where: { completed: false } })
]);
```

### Pattern 3: Conditional Queries

```javascript
const where = {};

// Build query dynamically
if (filters.completed !== undefined) {
  where.completed = filters.completed;
}

if (filters.category) {
  where.category = filters.category;
}

// Use completed where clause
await prisma.task.findMany({ where });
```

### Pattern 4: Check Before Update

```javascript
async updateTask(id, data) {
  // Always check exists before update
  const exists = await prisma.task.findUnique({ where: { id } });
  
  if (!exists) {
    const err = new Error('Task not found');
    err.status = 404;
    throw err;
  }

  return prisma.task.update({ where: { id }, data });
}
```

---

## Debugging Tips

### Enable Logging

```javascript
// In database/db.js
const prisma = new PrismaClient({
  log: [
    { emit: 'stdout', level: 'query' },
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'warn' },
  ],
});
```

### Check Database Directly

```bash
# Open Prisma Studio
npm run studio

# Then view data in browser UI
```

### Use Console Logs

```javascript
console.log('Request body:', req.body);
console.log('Filters:', filters);
console.log('Query result:', tasks);
```

### Test Endpoint

```bash
# See what endpoint returns
curl http://localhost:5000/api/tasks | json_pp

# Check response headers
curl -i http://localhost:5000/api/tasks
```

---

## Summary

**Key Takeaways:**

1. **Layered Architecture** - Controllers → Services → Database
2. **Middleware** - Processes requests before routes
3. **Error Handling** - Centralized error middleware
4. **Validation** - Zod validates all input
5. **Database** - Prisma provides type-safe queries
6. **Routes** - Map URLs to controller functions

This structure makes code:
- Easy to test
- Easy to maintain
- Easy to extend
- Professional quality

---

**Next Steps:**
- Read through existing code
- Modify an endpoint
- Add a new endpoint
- Experiment with Prisma queries

Happy coding! 🚀
