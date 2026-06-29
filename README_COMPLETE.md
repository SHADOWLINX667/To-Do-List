# Todo List Application - Complete Guide

A **production-ready full-stack task management application** with modern UI, responsive design, and comprehensive analytics. Built for learning and real-world deployment.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Features](#features)
4. [Architecture](#architecture)
5. [Installation](#installation)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Folder Structure](#folder-structure)
9. [How Everything Works](#how-everything-works)
10. [Deployment](#deployment)

---

## Project Overview

This application demonstrates a complete modern web development workflow:

- **Frontend**: React 19 with Vite for fast development and optimized builds
- **Backend**: Express.js with Prisma ORM for type-safe database queries
- **Database**: PostgreSQL (Neon) for reliable data storage
- **Design**: Minimal, modern UI inspired by Linear, Notion, and Todoist
- **Responsive**: Works perfectly on mobile (375px), tablet (768px), and desktop (1440px+)

### Real-World Use Cases

✅ Personal task management  
✅ Team project tracking  
✅ Productivity analytics  
✅ Learning full-stack development  
✅ Building portfolio projects  

---

## Technology Stack

### Frontend Technologies

#### **React 19** (UI Framework)
- Latest version of React with concurrent features
- Functional components with Hooks for state management
- Optimal performance with automatic batching
- [Official Docs](https://react.dev)

#### **Vite** (Build Tool)
- Lightning-fast development server (instant HMR - Hot Module Replacement)
- Optimized production builds using esbuild
- Native ES modules support
- [Official Docs](https://vitejs.dev)

#### **React Router v6** (Client-Side Navigation)
- SPA (Single Page Application) routing
- Dynamic route matching
- Nested routes support
- Lazy code splitting for better performance
- [Official Docs](https://reactrouter.com)

#### **Axios** (HTTP Client)
- Promise-based HTTP requests
- Automatic request/response transformation
- Request/response interceptors
- Timeout handling
- [Official Docs](https://axios-http.com)

#### **Chart.js** (Data Visualization)
- Beautiful charts: Pie, Bar, Line, Doughnut
- Responsive and animated
- Real-time data updates
- [Official Docs](https://www.chartjs.org)

#### **React Chart.js 2** (Chart Wrapper)
- React component wrapper for Chart.js
- Simplified API for React developers
- Easy data binding

#### **React Icons** (Icon Library)
- 10,000+ icons from multiple icon sets
- Tree-shakeable (only imports used icons)
- Lightweight and fast
- [Official Docs](https://react-icons.github.io/react-icons)

#### **CSS Modules** (Styling)
- Scoped CSS (no global namespace pollution)
- Component-specific styles
- Variable support with CSS custom properties
- BEM naming convention for maintainability

### Backend Technologies

#### **Node.js** (JavaScript Runtime)
- Server-side JavaScript execution
- Event-driven, non-blocking I/O
- V8 engine for fast execution
- Large npm ecosystem
- [Official Docs](https://nodejs.org)

#### **Express.js** (Web Framework)
- Minimal and flexible web framework
- Middleware support for cross-cutting concerns
- Simple routing system
- Industry standard for Node.js APIs
- [Official Docs](https://expressjs.com)

#### **Prisma** (ORM - Object-Relational Mapping)
- Type-safe database client
- Auto-generated TypeScript types
- Migrations system for schema versioning
- Prisma Studio for visual database management
- [Official Docs](https://www.prisma.io)

#### **PostgreSQL** (Relational Database)
- Open-source relational database
- ACID compliance (Atomicity, Consistency, Isolation, Durability)
- Advanced querying with SQL
- JSON support for flexible data
- [Official Docs](https://www.postgresql.org)

#### **Neon** (PostgreSQL Cloud Platform)
- Serverless PostgreSQL
- Auto-scaling and backups
- Connection pooling
- Free tier for development
- [Official Docs](https://neon.tech)

#### **Zod** (Schema Validation)
- TypeScript-first validation
- Runtime type checking
- Beautiful error messages
- Zero dependencies
- [Official Docs](https://zod.dev)

#### **Helmet** (Security Middleware)
- Helps secure Express apps by setting HTTP headers
- Protection against XSS, clickjacking, etc.
- Content Security Policy support
- [Official Docs](https://helmetjs.github.io)

#### **CORS** (Cross-Origin Resource Sharing)
- Enables frontend and backend communication
- Security boundary enforcement
- Request filtering by origin
- [Official Docs](https://expressjs.com/en/resources/middleware/cors.html)

#### **Express Rate Limit** (Rate Limiting)
- Prevents brute force attacks
- API abuse protection
- Request throttling
- Configurable limits per endpoint

---

## Features

### 📋 Task Management

| Feature | Description |
|---------|-------------|
| **Create Tasks** | Add new tasks with title, description, category, priority, and due date |
| **Read Tasks** | View all tasks with filtering and search |
| **Update Tasks** | Edit task details at any time |
| **Delete Tasks** | Remove tasks with confirmation modal |
| **Mark Complete** | Toggle task completion status instantly |
| **Categories** | Organize by Personal, Work, Health, Study, Finance |
| **Priorities** | Set Low, Medium, or High priority levels |
| **Due Dates** | Schedule tasks with date picker |
| **Descriptions** | Add detailed task descriptions |

### 🔍 Search & Filter

| Feature | Description |
|---------|-------------|
| **Live Search** | Search by title, description, or category in real-time |
| **Status Filter** | Filter by All, Active, or Completed tasks |
| **Category Filter** | Show tasks from specific categories |
| **Priority Filter** | View tasks by priority level |
| **5 Sort Options** | Newest first, oldest first, priority, due date, alphabetically |
| **Pagination** | 20 tasks per page with navigation |

### 📊 Analytics Dashboard

| Card | Shows |
|------|-------|
| **Total Tasks** | Number of all tasks created |
| **Completed Tasks** | Count of finished tasks |
| **Pending Tasks** | Count of incomplete tasks |
| **Completion Rate** | Percentage of completed tasks |
| **Today's Tasks** | Tasks created today |
| **Overdue Tasks** | Past due tasks not yet completed |
| **High Priority** | Tasks marked as high priority |
| **This Week** | Tasks created in past 7 days |

| Chart | Displays |
|-------|----------|
| **Completion Status** | Pie chart of completed vs pending |
| **By Category** | Bar chart showing tasks per category |
| **Weekly Trend** | Line chart of tasks created daily (7 days) |
| **Monthly Trend** | Bar chart of monthly creation and completion |
| **Priority Distribution** | Doughnut chart of priority levels |

| Insight | Calculates |
|---------|-----------|
| **Most Productive Category** | Category with highest completion rate |
| **Most Used Category** | Category with most tasks |
| **Avg Completion Time** | Average days to complete a task |
| **Completion Percentage** | Overall completion percentage |
| **Longest Pending Task** | Oldest uncompleted task |
| **Upcoming Deadlines** | Next 5 due dates |

### 🎨 User Interface

| Feature | Implementation |
|---------|-----------------|
| **Light Mode** | Clean, bright interface with primary color #5B5CEB |
| **Dark Mode** | Eye-friendly dark colors with persistent preference |
| **Smooth Transitions** | 150-300ms animations for all interactions |
| **Mobile Layout** | Single column with floating action button |
| **Tablet Layout** | Centered layout with optimized spacing |
| **Desktop Layout** | Sidebar navigation with spacious grid |
| **Responsive Images** | Optimized for all screen sizes |
| **Loading States** | Spinners for async operations |
| **Empty States** | Helpful messages when no data |
| **Error Messages** | User-friendly error notifications |

### 🔐 Security Features

| Feature | Benefit |
|---------|---------|
| **Input Validation** | Zod validates all user input before processing |
| **SQL Injection Protection** | Prisma parameterized queries prevent injection |
| **XSS Protection** | Helmet security headers block XSS attacks |
| **CORS Enabled** | Only frontend origin can access API |
| **Rate Limiting** | Prevents brute force and API abuse |
| **HTTPS Ready** | Works with HTTPS on production |
| **Environment Variables** | Secrets stored in .env, not in code |
| **Password-Free** | No authentication for simplicity (v1) |

### ⚡ Performance Optimizations

| Optimization | Impact |
|--------------|--------|
| **Code Splitting** | Lazy load routes for faster initial load |
| **CSS Modules** | Only load styles for visible components |
| **Database Indexes** | Fast queries on frequently searched fields |
| **Pagination** | Reduce data transfer and rendering |
| **Debounced Search** | Prevent excessive API calls while typing |
| **Efficient Rendering** | React.memo for expensive components |
| **Vite Build** | Optimized production bundle |
| **Caching Headers** | Browser caches static assets |

---

## Architecture

### Frontend Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      React Application                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │           Layout (Header/Sidebar/Nav)             │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │     Pages (Home / Statistics / 404)              │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Components (Task, Modal, Filter, Charts, etc)   │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Custom Hooks (useTasks, useTheme, etc)        │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │      API Service (Axios Requests)                │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │          Backend API (Express.js)                │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Backend Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   Express Application                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  HTTP Request from Frontend (via Axios)         │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Middleware (CORS, Helmet, Body Parser)        │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │        Router (Route Matching)                   │  │
│  │   /api/tasks → taskRoutes                        │  │
│  │   /api/statistics → statisticsRoutes             │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │      Controller (Request Handler)                │  │
│  │   - Extract request data                         │  │
│  │   - Validate input                               │  │
│  │   - Call service method                          │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │      Service (Business Logic)                    │  │
│  │   - Process data                                 │  │
│  │   - Call database queries                        │  │
│  │   - Return results                               │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │    Database (Prisma + PostgreSQL)               │  │
│  │   - Create, Read, Update, Delete operations     │  │
│  │   - Return data to service                      │  │
│  └──────────────────────────────────────────────────┘  │
│                        ↓                                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │   Response (JSON data back to Frontend)         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
User Action (Frontend)
        ↓
React State Update
        ↓
API Call (Axios)
        ↓
Express Route
        ↓
Controller Receives Request
        ↓
Validate Input (Zod)
        ↓
Service Process Data
        ↓
Database Query (Prisma)
        ↓
PostgreSQL Execute Query
        ↓
Return Data (Prisma)
        ↓
Service Format Response
        ↓
Controller Send JSON
        ↓
Axios Receive Response
        ↓
React Update State
        ↓
UI Re-render with New Data
```

---

## Installation

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **PostgreSQL** database (local or cloud like Neon)
- **Git** for version control

### Quick Start (5 minutes)

#### 1. Clone Project

```bash
cd TO-DO-LIST
```

#### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file with database URL
# DATABASE_URL="your_postgresql_connection_string"

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

Backend runs on: `http://localhost:5000`

#### 3. Frontend Setup (new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5173`

#### 4. Open in Browser

Visit: `http://localhost:5173`

---

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### **GET /tasks**

Retrieve all tasks with filtering, sorting, and pagination.

**Query Parameters:**
```
?page=1                    // Page number (default: 1)
&limit=20                  // Items per page (default: 20)
&completed=true/false      // Filter by completion
&category=Work             // Filter by category
&priority=high             // Filter by priority (low, medium, high)
&search=keyword            // Search in title, description, category
&sort=newest               // Sort by: newest, oldest, priority, dueDate, alphabetically
```

**Example Request:**
```bash
curl "http://localhost:5000/api/tasks?page=1&completed=false&sort=priority"
```

**Success Response (200):**
```json
{
  "tasks": [
    {
      "id": "clp1a2b3c4d5e6f7g8h9i0j1k",
      "title": "Complete project report",
      "description": "Finish the Q4 report",
      "category": "Work",
      "priority": "high",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "completed": false,
      "createdAt": "2024-06-29T10:30:00.000Z",
      "updatedAt": "2024-06-29T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "pages": 3
  }
}
```

#### **GET /tasks/:id**

Get a specific task by ID.

**Example Request:**
```bash
curl http://localhost:5000/api/tasks/clp1a2b3c4d5e6f7g8h9i0j1k
```

**Success Response (200):**
```json
{
  "id": "clp1a2b3c4d5e6f7g8h9i0j1k",
  "title": "Complete project report",
  "description": "Finish the Q4 report",
  "category": "Work",
  "priority": "high",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "completed": false,
  "createdAt": "2024-06-29T10:30:00.000Z",
  "updatedAt": "2024-06-29T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Task not found"
}
```

#### **POST /tasks**

Create a new task.

**Request Body:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "category": "Personal",
  "priority": "medium",
  "dueDate": "2024-07-05T00:00:00.000Z"
}
```

**Success Response (201):**
```json
{
  "id": "clp1z9y8x7w6v5u4t3s2r1q0p",
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "category": "Personal",
  "priority": "medium",
  "dueDate": "2024-07-05T00:00:00.000Z",
  "completed": false,
  "createdAt": "2024-06-29T11:45:00.000Z",
  "updatedAt": "2024-06-29T11:45:00.000Z"
}
```

**Validation Error (400):**
```json
{
  "error": "Validation error",
  "details": [
    {
      "code": "too_small",
      "minimum": 1,
      "type": "string",
      "path": ["title"],
      "message": "Title is required"
    }
  ]
}
```

#### **PUT /tasks/:id**

Update an existing task.

**Request Body:**
```json
{
  "title": "Updated title",
  "completed": true,
  "priority": "high"
}
```

**Success Response (200):**
```json
{
  "id": "clp1a2b3c4d5e6f7g8h9i0j1k",
  "title": "Updated title",
  "description": "Finish the Q4 report",
  "category": "Work",
  "priority": "high",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "completed": true,
  "createdAt": "2024-06-29T10:30:00.000Z",
  "updatedAt": "2024-06-29T12:00:00.000Z"
}
```

#### **DELETE /tasks/:id**

Delete a task.

**Example Request:**
```bash
curl -X DELETE http://localhost:5000/api/tasks/clp1a2b3c4d5e6f7g8h9i0j1k
```

**Success Response (204):**
No content (empty response)

#### **PATCH /tasks/:id/complete**

Toggle task completion status.

**Example Request:**
```bash
curl -X PATCH http://localhost:5000/api/tasks/clp1a2b3c4d5e6f7g8h9i0j1k/complete
```

**Success Response (200):**
```json
{
  "id": "clp1a2b3c4d5e6f7g8h9i0j1k",
  "title": "Complete project report",
  "description": "Finish the Q4 report",
  "category": "Work",
  "priority": "high",
  "dueDate": "2024-12-31T00:00:00.000Z",
  "completed": true,  // Toggled from false to true
  "createdAt": "2024-06-29T10:30:00.000Z",
  "updatedAt": "2024-06-29T12:05:00.000Z"
}
```

#### **GET /statistics**

Get comprehensive statistics and analytics.

**Example Request:**
```bash
curl http://localhost:5000/api/statistics
```

**Success Response (200):**
```json
{
  "summary": {
    "totalTasks": 42,
    "completedTasks": 28,
    "pendingTasks": 14,
    "completionRate": 67,
    "todaysTasks": 3,
    "overdueTasks": 2,
    "highPriorityTasks": 8,
    "tasksCreatedThisWeek": 15
  },
  "categoryStats": [
    {
      "category": "Work",
      "total": 25,
      "completed": 18,
      "percentage": 72
    },
    {
      "category": "Personal",
      "total": 17,
      "completed": 10,
      "percentage": 59
    }
  ],
  "priorityStats": [
    {
      "priority": "low",
      "total": 12,
      "completed": 10
    },
    {
      "priority": "medium",
      "total": 22,
      "completed": 14
    },
    {
      "priority": "high",
      "total": 8,
      "completed": 4
    }
  ],
  "weeklyStats": {
    "Sun": 2,
    "Mon": 3,
    "Tue": 2,
    "Wed": 4,
    "Thu": 2,
    "Fri": 1,
    "Sat": 1
  },
  "monthlyStats": [
    {
      "month": "Jan",
      "created": 5,
      "completed": 3
    },
    {
      "month": "Feb",
      "created": 8,
      "completed": 5
    },
    // ... more months
  ],
  "completionTimeline": [
    {
      "id": "task_id",
      "title": "Task title",
      "completedAt": "2024-06-28T15:30:00.000Z",
      "daysSinceCreation": 3
    }
  ],
  "insights": {
    "mostProductiveCategory": "Work",
    "mostUsedCategory": "Work",
    "averageCompletionTime": 2,
    "completionPercentage": 67,
    "longestPendingTask": {
      "id": "task_id",
      "title": "Long pending task",
      "createdAt": "2024-05-01T00:00:00.000Z"
    },
    "upcomingDeadlines": [
      {
        "id": "task_id",
        "title": "Task due soon",
        "dueDate": "2024-07-01T00:00:00.000Z"
      }
    ]
  }
}
```

### Error Responses

**500 - Internal Server Error:**
```json
{
  "error": "Internal server error",
  "code": "INTERNAL_ERROR"
}
```

**503 - Database Connection Error:**
```json
{
  "error": "Database connection error",
  "message": "Unable to connect to database. Please check your connection string."
}
```

---

## Database Schema

### Task Table

The core table that stores all task data.

```sql
CREATE TABLE "Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(50) NOT NULL,
    "priority" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "dueDate" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);
```

### Indexes

Indexes speed up database queries on frequently searched columns.

```sql
CREATE INDEX "Task_createdAt_idx" ON "Task"("createdAt");
CREATE INDEX "Task_completed_idx" ON "Task"("completed");
CREATE INDEX "Task_category_idx" ON "Task"("category");
CREATE INDEX "Task_priority_idx" ON "Task"("priority");
CREATE INDEX "Task_dueDate_idx" ON "Task"("dueDate");
```

### Column Descriptions

| Column | Type | Description |
|--------|------|-------------|
| **id** | TEXT | Unique identifier (CUID format) |
| **title** | VARCHAR(255) | Task name/title |
| **description** | TEXT | Detailed task description (optional) |
| **category** | VARCHAR(50) | Task category (Personal, Work, etc) |
| **priority** | VARCHAR(20) | Priority level (low, medium, high) |
| **dueDate** | TIMESTAMP | When the task is due (optional) |
| **completed** | BOOLEAN | Whether task is finished |
| **createdAt** | TIMESTAMP | When task was created |
| **updatedAt** | TIMESTAMP | Last modification time |

### Sample Data

```json
{
  "id": "clp1a2b3c4d5e6f7g8h9i0j1k",
  "title": "Complete quarterly report",
  "description": "Compile sales data and prepare presentation",
  "category": "Work",
  "priority": "high",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "completed": false,
  "createdAt": "2024-06-29T10:30:00.000Z",
  "updatedAt": "2024-06-29T10:30:00.000Z"
}
```

---

## Folder Structure

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Checkbox.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   └── CategoryBadge.jsx
│   │   │
│   │   ├── layout/              # Layout components
│   │   │   ├── Layout.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── BottomNav.jsx
│   │   │
│   │   ├── task/                # Task-specific components
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskModal.jsx
│   │   │   ├── DeleteConfirmModal.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── ProgressBar.jsx
│   │   │
│   │   └── statistics/          # Chart components
│   │       ├── StatisticsCard.jsx
│   │       ├── CompletionChart.jsx
│   │       ├── CategoryChart.jsx
│   │       ├── WeeklyChart.jsx
│   │       ├── MonthlyChart.jsx
│   │       └── PriorityChart.jsx
│   │
│   ├── pages/                   # Page components
│   │   ├── Home.jsx
│   │   ├── Statistics.jsx
│   │   └── NotFound.jsx
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTasks.js
│   │   ├── useTheme.js
│   │   └── useStatistics.js
│   │
│   ├── services/                # API communication
│   │   └── api.js
│   │
│   ├── utils/                   # Helper functions
│   │   ├── dateUtils.js
│   │   └── categoryUtils.js
│   │
│   ├── App.jsx                  # Root component
│   ├── App.module.css
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
│
├── index.html                   # HTML template
├── package.json
├── vite.config.js
├── .env.example
├── .env.local
└── README.md
```

### Backend Structure

```
backend/
├── controllers/                 # Request handlers
│   ├── taskController.js
│   └── statisticsController.js
│
├── routes/                      # API routes
│   ├── tasks.js
│   └── statistics.js
│
├── services/                    # Business logic
│   ├── taskService.js
│   └── statisticsService.js
│
├── middleware/                  # Express middleware
│   └── errorHandler.js
│
├── validators/                  # Input validation
│   └── taskValidator.js
│
├── database/                    # Database connection
│   └── db.js
│
├── prisma/                      # Prisma ORM
│   ├── schema.prisma
│   └── migrations/
│       └── init/
│           └── migration.sql
│
├── app.js                       # Express app setup
├── server.js                    # Entry point
├── package.json
├── .env.example
├── .env.local
└── README.md
```

---

## How Everything Works

### Frontend Data Flow

#### 1. **Component Renders**
```jsx
function Home() {
  // useTasks hook fetches data from API
  const { tasks, loading, createTask } = useTasks(filters, page);
  
  return (
    <div>
      {loading ? <Loader /> : <TaskList tasks={tasks} />}
    </div>
  );
}
```

#### 2. **User Interaction**
When a user clicks "Add Task":
```jsx
const handleAddTask = async (formData) => {
  // Call API to save task
  await createTask(formData);
  // State updates automatically
};
```

#### 3. **API Call (Axios)**
```javascript
// services/api.js
export const tasksAPI = {
  create: (data) => axiosInstance.post('/tasks', data)
};

// This sends HTTP POST to backend
```

#### 4. **State Update**
```javascript
// hooks/useTasks.js
const createTask = async (data) => {
  const response = await tasksAPI.create(data);
  setTasks((prev) => [response.data, ...prev]);
};
```

#### 5. **UI Re-render**
React detects state change and re-renders component with new task.

### Backend Request Processing

#### 1. **Request Arrives**
```
POST /api/tasks
Content-Type: application/json

{
  "title": "New task",
  "category": "Work"
}
```

#### 2. **Router Matches**
```javascript
// routes/tasks.js
router.post('/', createTask);  // Sends to controller
```

#### 3. **Controller Processes**
```javascript
// controllers/taskController.js
export const createTask = async (req, res, next) => {
  try {
    // Validate input
    const data = validateCreateTask(req.body);
    
    // Call service
    const task = await taskService.createTask(data);
    
    // Send response
    res.status(201).json(task);
  } catch (err) {
    next(err);  // Pass to error handler
  }
};
```

#### 4. **Service Layer**
```javascript
// services/taskService.js
async createTask(data) {
  // Process data
  // Call database
  return prisma.task.create({ data });
}
```

#### 5. **Database Query**
```javascript
// Prisma executes SQL
INSERT INTO "Task" (id, title, category, priority, ...)
VALUES ('clp1...', 'New task', 'Work', 'medium', ...)
```

#### 6. **Response Returns**
```json
{
  "id": "clp1...",
  "title": "New task",
  "category": "Work"
  // ... other fields
}
```

### Real-Time Statistics Updates

When any task changes:

1. **Frontend API Call** → Updates task
2. **Backend Processes** → Saves to database
3. **Frontend Triggers** → `useStatistics().refetch()`
4. **Backend Calculates** → New statistics
5. **Charts Update** → UI re-renders with new data

Example calculation:
```javascript
// Completion rate = (completed / total) * 100
const rate = (28 / 42) * 100;  // 66.67%
```

---

## Deployment

See dedicated deployment guides:

- **[Render Deployment Guide](./DEPLOYMENT_RENDER.md)** - Backend
- **[Vercel Deployment Guide](./DEPLOYMENT_VERCEL.md)** - Frontend

### Quick Deployment Checklist

```
Frontend (Vercel):
☐ Push code to GitHub
☐ Connect repository to Vercel
☐ Set VITE_API_URL environment variable
☐ Deploy

Backend (Render):
☐ Push code to GitHub
☐ Create Web Service on Render
☐ Set DATABASE_URL environment variable
☐ Set FRONTEND_URL environment variable
☐ Deploy

Database (Neon):
☐ Create account
☐ Create project
☐ Copy connection string
☐ Use as DATABASE_URL
```

---

## Environment Variables

### Frontend `.env.local`

```env
# API base URL for axios requests
VITE_API_URL=http://localhost:5000/api
```

**Production:**
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

### Backend `.env.local`

```env
# PostgreSQL connection string (Neon)
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Server port
PORT=5000

# Environment: development or production
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173
```

**Production:**
```env
DATABASE_URL=your_neon_url
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## Development Workflow

### Making Changes

1. **Backend Change:**
   - Edit files in `/backend`
   - Automatic reload with nodemon
   - Test with curl or Postman

2. **Frontend Change:**
   - Edit files in `/frontend`
   - Automatic reload with Vite (instant HMR)
   - See changes immediately

3. **Database Change:**
   - Update `schema.prisma`
   - Run `npm run migrate:dev`
   - Creates migration automatically

### Testing

```bash
# Test backend API
curl http://localhost:5000/api/tasks

# Test frontend
Open http://localhost:5173 in browser

# Test database connection
npm run studio  # Opens Prisma Studio
```

---

## Common Issues & Solutions

### Issue: `net::ERR_CONNECTION_REFUSED`

**Cause:** Backend not running

**Solution:**
```bash
cd backend
npm run dev
```

### Issue: `DATABASE_URL not found`

**Cause:** Missing `.env` file

**Solution:**
```bash
cp .env.example .env
# Update DATABASE_URL value
```

### Issue: CORS errors

**Cause:** Wrong FRONTEND_URL in backend

**Solution:**
```env
# backend/.env
FRONTEND_URL=http://localhost:5173
```

### Issue: Slow database queries

**Cause:** Missing indexes

**Solution:** Indexes already created in migration

---

## Learning Resources

### Frontend Concepts
- [React Official Tutorial](https://react.dev/learn)
- [React Hooks Guide](https://react.dev/reference/react)
- [Vite Guide](https://vitejs.dev/guide/)
- [CSS Modules](https://github.com/css-modules/css-modules)

### Backend Concepts
- [Express.js Guide](https://expressjs.com/en/starter/basic-routing.html)
- [Prisma Tutorial](https://www.prisma.io/docs/getting-started)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [REST API Design](https://restfulapi.net/)

### Database
- [PostgreSQL Basics](https://www.postgresql.org/docs/current/tutorial.html)
- [SQL Tutorial](https://www.w3schools.com/sql/)
- [Prisma Schema](https://www.prisma.io/docs/concepts/components/prisma-schema)

### DevOps
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Neon Documentation](https://neon.tech/docs/introduction)

---

## Contributing

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes with clear commits
3. Test thoroughly
4. Submit pull request

---

## License

MIT - Free for personal and commercial use

---

## Support & Questions

- 📧 Check documentation in each folder
- 🐛 Review code comments for implementation details
- 📚 See DEVELOPMENT.md for technical deep-dive
- 🚀 See deployment guides for production setup

**Built with ❤️ for full-stack learning**
