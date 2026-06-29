# Frontend - Detailed Developer Guide

This guide explains every file in the frontend, how it works, and how to extend it. Perfect for junior developers learning the codebase!

## Table of Contents

1. [Project Setup](#project-setup)
2. [File Structure Explained](#file-structure-explained)
3. [Entry Point](#entry-point)
4. [Routing System](#routing-system)
5. [Custom Hooks](#custom-hooks)
6. [Services (API)](#services-api)
7. [Utilities](#utilities)
8. [Components Explained](#components-explained)
9. [Pages Explained](#pages-explained)
10. [Styling (CSS Modules)](#styling-css-modules)
11. [Common Patterns](#common-patterns)
12. [Debugging](#debugging)

---

## Project Setup

### What is Vite?

Vite is a build tool that makes React development **super fast**:

- **Instant startup** - No waiting for build, dev server starts in milliseconds
- **Hot Module Replacement (HMR)** - Edit code, see changes instantly (no page refresh!)
- **Optimized production build** - Creates small, fast bundle

### Running the Project

```bash
# Install dependencies (one time only)
npm install

# Start development server
npm run dev
# Opens http://localhost:5173 automatically

# Create production build
npm run build

# Preview production build locally
npm run preview
```

### File: `vite.config.js`

Configures Vite for React development:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],  // Use React plugin
  server: {
    port: 5173,         // Dev server port
    open: true          // Auto-open browser
  }
})
```

**What it does:**
- `plugins: [react()]` - Enables React JSX transformation
- `port: 5173` - Runs on this port
- `open: true` - Automatically opens browser when server starts

---

## File Structure Explained

### Root Files

```
frontend/
├── index.html                  # HTML template (loaded by browser)
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
├── .env.example                # Template for environment variables
└── .env.local                  # Your actual env vars (git-ignored)
```

### `src/` Folder

```
src/
├── main.jsx                    # React app entry point
├── index.css                   # Global styles
└── App.jsx                     # Root component
```

---

## Entry Point

### `index.html`

The HTML file loaded by the browser:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Todo App</title>
  </head>
  <body>
    <!-- React renders here -->
    <div id="root"></div>
    
    <!-- Load React app -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

**What happens:**
1. Browser loads `index.html`
2. Creates empty `<div id="root"></div>`
3. Runs `main.jsx` which renders React app into root

### `src/main.jsx`

Entry point for React application:

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Render React app into HTML element with id="root"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

**What it does:**
- Imports React and ReactDOM (browser rendering library)
- Imports App component (root of your app)
- Imports global styles
- Renders App component into `<div id="root">`
- `<React.StrictMode>` helps find bugs during development

**Important:** This file should rarely change!

### `src/index.css`

Global styles applied to entire application:

```css
:root {
  /* CSS Variables - used everywhere */
  --color-primary: #5B5CEB;
  --color-bg-light: #F6F7FB;
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --radius-lg: 16px;
  --transition-base: 200ms ease-in-out;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
  background-color: var(--color-bg-light);
  color: var(--color-text-primary);
}

/* Dark mode - adds 'dark-mode' class to body */
body.dark-mode {
  --color-bg-light: #0F172A;
  --color-text-primary: #F3F4F6;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Key concepts:**
- **CSS Variables** (--variable-name) - Used like `var(--color-primary)`
- **Reusable colors** - Change once, updates everywhere
- **Dark mode** - Class added to `<body>` toggles all colors
- **Animations** - @keyframes defined here, used in components

---

## Routing System

### `src/App.jsx`

Root component that sets up routing:

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Statistics from './pages/Statistics';
import NotFound from './pages/NotFound';
import styles from './App.module.css';

function App() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Router>
      <div className={styles.app}>
        <Routes>
          {/* All routes inside Layout component */}
          <Route element={<Layout isDark={isDark} toggleTheme={toggleTheme} />}>
            <Route path="/" element={<Home />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

**How it works:**

1. **Router** - Enables client-side routing
2. **Routes** - Container for all routes
3. **Route with element** - Renders `<Layout>` for every route
4. **Nested Routes** - `<Outlet>` in Layout shows page content
5. **Path matching**:
   - `/` → Show Home page
   - `/statistics` → Show Statistics page
   - `*` → Anything else → Show NotFound page

**Routing flow:**
```
User clicks link
        ↓
URL changes (no page reload!)
        ↓
React Router matches URL to Route
        ↓
Corresponding component renders
        ↓
Layout stays, only page content changes
```

---

## Custom Hooks

Hooks are functions that "hook into" React features. Custom hooks let you reuse logic across components.

### `src/hooks/useTasks.js`

Fetches and manages tasks data:

```javascript
import { useState, useEffect, useCallback } from 'react';
import { tasksAPI } from '../services/api';

export const useTasks = (filters = {}, page = 1) => {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch tasks from API
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Call API with filters and page
      const response = await tasksAPI.getAll({ ...filters, page });
      
      // Update state with response
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  // Auto-fetch when filters or page changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create new task
  const createTask = useCallback(async (data) => {
    try {
      const response = await tasksAPI.create(data);
      // Add new task to beginning of list
      setTasks((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Update existing task
  const updateTask = useCallback(async (id, data) => {
    try {
      const response = await tasksAPI.update(id, data);
      // Replace task in list
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Delete task
  const deleteTask = useCallback(async (id) => {
    try {
      await tasksAPI.delete(id);
      // Remove task from list
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Toggle completion
  const toggleComplete = useCallback(async (id) => {
    try {
      const response = await tasksAPI.toggleComplete(id);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  // Return everything so components can use it
  return {
    tasks,
    pagination,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
};
```

**How to use in a component:**

```javascript
function Home() {
  // Call hook to get tasks and methods
  const { tasks, loading, error, createTask } = useTasks();

  const handleAddTask = async (formData) => {
    await createTask(formData);  // Call the function
  };

  return (
    <>
      {loading && <Loader />}
      {tasks.map(task => <TaskCard key={task.id} task={task} />)}
    </>
  );
}
```

### `src/hooks/useTheme.js`

Manages light/dark mode:

```javascript
import { useState, useEffect, useCallback } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  // On app start, check saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Use saved preference, or system preference, or default to light
    const shouldBeDark = savedTheme === 'dark' || (savedTheme === null && prefersDark);
    setIsDark(shouldBeDark);
    updateTheme(shouldBeDark);
  }, []);

  // Actually apply the theme to DOM
  const updateTheme = (dark) => {
    if (dark) {
      document.body.classList.add('dark-mode');  // Adds class to <body>
      localStorage.setItem('theme', 'dark');      // Save preference
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  };

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      updateTheme(!prev);
      return !prev;
    });
  }, []);

  return { isDark, toggleTheme };
};
```

**How it works:**
1. **Read preference** - Check localStorage for saved theme
2. **Add CSS class** - `body.dark-mode` triggers all dark mode colors
3. **Save preference** - localStorage persists choice across page reloads
4. **Toggle function** - Click button to switch themes

### `src/hooks/useStatistics.js`

Fetches statistics data:

```javascript
import { useState, useEffect, useCallback } from 'react';
import { statisticsAPI } from '../services/api';

export const useStatistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await statisticsAPI.getStatistics();
      setStatistics(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount
  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return {
    statistics,
    loading,
    error,
    refetch: fetchStatistics,  // Call to refresh stats
  };
};
```

---

## Services (API)

### `src/services/api.js`

Handles all communication with backend:

```javascript
import axios from 'axios';

// Create axios instance with base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tasks API endpoints
export const tasksAPI = {
  // GET /api/tasks?page=1&filter=...
  getAll: (params) => axiosInstance.get('/tasks', { params }),
  
  // GET /api/tasks/id
  getById: (id) => axiosInstance.get(`/tasks/${id}`),
  
  // POST /api/tasks with JSON body
  create: (data) => axiosInstance.post('/tasks', data),
  
  // PUT /api/tasks/id with updated data
  update: (id, data) => axiosInstance.put(`/tasks/${id}`, data),
  
  // DELETE /api/tasks/id
  delete: (id) => axiosInstance.delete(`/tasks/${id}`),
  
  // PATCH /api/tasks/id/complete
  toggleComplete: (id) => axiosInstance.patch(`/tasks/${id}/complete`),
};

// Statistics API endpoints
export const statisticsAPI = {
  // GET /api/statistics
  getStatistics: () => axiosInstance.get('/statistics'),
};

export default axiosInstance;
```

**Key concepts:**

1. **Axios** - HTTP library for making requests
2. **Base URL** - Prepended to all requests
3. **Environment variable** - `VITE_API_URL` from `.env`
4. **Endpoints** - Each property is one API call
5. **Params/Data** - Passed to functions and sent to API

**How to use:**

```javascript
// In a hook or component
const response = await tasksAPI.create({
  title: 'New task',
  category: 'Work'
});
console.log(response.data);  // Returns created task
```

---

## Utilities

### `src/utils/dateUtils.js`

Helper functions for working with dates:

```javascript
// Format: "Jun 29, 2024"
export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format: "Jun 29, 2024 2:30 PM"
export const formatDateTime = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format: "just now", "5m ago", "2h ago", "3d ago"
export const formatRelativeTime = (date) => {
  if (!date) return '';

  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return formatDate(date);
};

// Check if date is today
export const isToday = (date) => {
  if (!date) return false;
  const today = new Date();
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

// Check if date is tomorrow
export const isTomorrow = (date) => {
  if (!date) return false;
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const checkDate = new Date(date);
  return (
    checkDate.getDate() === tomorrow.getDate() &&
    checkDate.getMonth() === tomorrow.getMonth() &&
    checkDate.getFullYear() === tomorrow.getFullYear()
  );
};

// Check if date is past and not completed
export const isOverdue = (date, completed) => {
  if (!date || completed) return false;
  return new Date(date) < new Date();
};

// Smart date display: "Today", "Tomorrow", "Overdue", or "Jun 29"
export const getDueText = (date) => {
  if (!date) return '';
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isOverdue(date, false)) return 'Overdue';
  return formatDate(date);
};
```

**Usage examples:**

```javascript
// In TaskCard component
<span className={styles.dueDate}>
  {getDueText(task.dueDate)}
</span>

// In comment list
<span>{formatRelativeTime(comment.createdAt)}</span>  // "5m ago"
```

### `src/utils/categoryUtils.js`

Category configuration and colors:

```javascript
// Color for each category
export const categoryColors = {
  Personal: '#3B82F6',   // Blue
  Work: '#10B981',       // Green
  Health: '#F59E0B',     // Orange
  Study: '#8B5CF6',      // Purple
  Finance: '#EF4444',    // Red
};

// Get color for a category
export const getCategoryColor = (category) => {
  return categoryColors[category] || '#6B7280';  // Default gray
};

// Get text color (different in dark mode)
export const getCategoryTextColor = (category) => {
  const isDark = document.body.classList.contains('dark-mode');
  const colorMap = {
    Personal: isDark ? '#93C5FD' : '#1E40AF',
    Work: isDark ? '#6EE7B7' : '#065F46',
    // ... more colors
  };
  return colorMap[category] || '#374151';
};

// List of available categories
export const defaultCategories = [
  'Personal',
  'Work',
  'Health',
  'Study',
  'Finance',
];
```

**Usage:**

```javascript
// In TaskModal dropdown
<select name="category">
  {defaultCategories.map((cat) => (
    <option key={cat} value={cat}>{cat}</option>
  ))}
</select>

// In CategoryBadge component
const color = getCategoryColor(task.category);
<span style={{ color, backgroundColor: `${color}20` }}>
  {task.category}
</span>
```

---

## Components Explained

### Common Components (Reusable)

#### `src/components/common/Button.jsx`

Reusable button with multiple styles:

```javascript
import styles from './Button.module.css';

function Button({
  children,
  variant = 'primary',  // primary, secondary, danger
  size = 'md',          // xs, sm, md, lg, xl
  disabled = false,
  className = '',
  ...props  // Spread HTML attributes (onClick, type, etc)
}) {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

export default Button;
```

**How to use:**

```javascript
// Primary button
<Button variant="primary" size="lg" onClick={handleSave}>
  Save Task
</Button>

// Danger button (delete)
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>

// Secondary button
<Button variant="secondary">Cancel</Button>
```

#### `src/components/common/Input.jsx`

Text input with label and error handling:

```javascript
import styles from './Input.module.css';

function Input({
  label,
  error,
  size = 'md',
  className = '',
  ...props  // HTML input attributes
}) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${styles[size]} ${error ? styles.error : ''} ${className}`}
        {...props}  // Pass through placeholder, type, value, onChange, etc
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default Input;
```

**How to use:**

```javascript
const [title, setTitle] = useState('');
const [error, setError] = useState('');

<Input
  label="Task Title"
  type="text"
  placeholder="Enter title..."
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  error={error}
/>
```

#### `src/components/common/Modal.jsx`

Dialog box for forms and confirmations:

```javascript
import { useEffect } from 'react';
import styles from './Modal.module.css';

function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  // Prevent body scroll when modal open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;  // Don't render if closed

  return (
    <div className={styles.overlay} onClick={onClose}>
      {/* Stop click from closing if clicked inside modal */}
      <div
        className={`${styles.modal} ${styles[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
```

**How to use:**

```javascript
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add Task">
  <TaskForm onSave={handleSave} />
</Modal>

<button onClick={() => setIsOpen(true)}>Open Modal</button>
```

#### `src/components/common/Loader.jsx`

Spinning loading indicator:

```javascript
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Loader;
```

**How to use:**

```javascript
{loading ? <Loader /> : <TaskList tasks={tasks} />}
```

#### `src/components/common/Checkbox.jsx`

Custom styled checkbox:

```javascript
import styles from './Checkbox.module.css';

function Checkbox({ checked, onChange, label, ...props }) {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        {...props}
      />
      <div className={styles.checkboxCustom}>
        {/* Checkmark SVG */}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

export default Checkbox;
```

**How to use:**

```javascript
const [completed, setCompleted] = useState(false);

<Checkbox
  checked={completed}
  onChange={(e) => setCompleted(e.target.checked)}
  label="Mark as done"
/>
```

### Layout Components

#### `src/components/layout/Layout.jsx`

Main layout wrapper for all pages:

```javascript
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import styles from './Layout.module.css';

function Layout({ isDark, toggleTheme }) {
  return (
    <div className={styles.layout}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <div className={styles.container}>
        <Sidebar />  {/* Desktop only */}
        <main className={styles.main}>
          <Outlet />  {/* Renders current page (Home/Statistics/etc) */}
        </main>
      </div>
      <BottomNav />  {/* Mobile only */}
    </div>
  );
}

export default Layout;
```

**How it works:**
- `<Outlet />` is replaced by the current page component
- Sidebar hidden on mobile
- BottomNav shown only on mobile
- Header always visible

#### `src/components/layout/Header.jsx`

Top navigation bar:

```javascript
import { Link } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import styles from './Header.module.css';

function Header({ isDark, toggleTheme }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo links to home */}
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>✓</div>
          <span className={styles.logoText}>Tasks</span>
        </Link>

        {/* Navigation links */}
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>Home</Link>
          <Link to="/statistics" className={styles.navLink}>Statistics</Link>
        </nav>

        {/* Theme toggle button */}
        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
```

### Task Components

#### `src/components/task/TaskCard.jsx`

Displays single task with actions:

```javascript
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Checkbox from '../common/Checkbox';
import CategoryBadge from '../common/CategoryBadge';
import { formatDate, getDueText, isOverdue } from '../../utils/dateUtils';
import styles from './TaskCard.module.css';

function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const isDueToday = isToday(task.dueDate);
  const isOverdueTask = isOverdue(task.dueDate, task.completed);

  return (
    <div className={`${styles.card} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.left}>
        {/* Checkbox to mark complete */}
        <Checkbox
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        
        <div className={styles.content}>
          <h3 className={styles.title}>{task.title}</h3>
          {task.description && (
            <p className={styles.description}>{task.description}</p>
          )}
          
          <div className={styles.meta}>
            <CategoryBadge category={task.category} />
            {task.priority === 'high' && (
              <span className={styles.priorityBadge}>!</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        {task.dueDate && (
          <span className={`${styles.dueDate} ${isDueToday ? styles.today : ''}`}>
            {getDueText(task.dueDate)}
          </span>
        )}

        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={() => onEdit(task)}
            aria-label="Edit task"
          >
            <FiEdit2 size={18} />
          </button>
          <button
            className={`${styles.actionButton} ${styles.delete}`}
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
```

**How to use:**

```javascript
<TaskCard
  task={task}
  onToggleComplete={handleToggle}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

#### `src/components/task/TaskModal.jsx`

Form to create/edit tasks:

```javascript
import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';
import { defaultCategories } from '../../utils/categoryUtils';
import styles from './TaskModal.module.css';

function TaskModal({ isOpen, onClose, onSave, task = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Personal',
    priority: 'medium',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});

  // If editing, pre-fill form
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        category: task.category,
        priority: task.priority,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      // Reset form for new task
      setFormData({
        title: '',
        description: '',
        category: 'Personal',
        priority: 'medium',
        dueDate: '',
      });
    }
    setErrors({});
  }, [task, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
    };

    await onSave(submitData, task?.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Edit Task' : 'Add Task'}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Task Title"
          name="title"
          type="text"
          placeholder="What do you need to do?"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />

        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            placeholder="Add details (optional)"
            value={formData.description}
            onChange={handleChange}
            className={styles.textarea}
            rows="4"
          />
        </div>

        <div className={styles.row}>
          <div className={styles.col}>
            <label className={styles.label}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.select}
            >
              {defaultCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className={styles.col}>
            <label className={styles.label}>Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <Input
          label="Due Date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
        />

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Save Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default TaskModal;
```

---

## Pages Explained

### `src/pages/Home.jsx`

Main task management page:

```javascript
import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useTasks } from '../hooks/useTasks';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import TaskCard from '../components/task/TaskCard';
import TaskModal from '../components/task/TaskModal';
import DeleteConfirmModal from '../components/task/DeleteConfirmModal';
import FilterBar from '../components/task/FilterBar';
import ProgressBar from '../components/task/ProgressBar';
import styles from './Home.module.css';

function Home() {
  // Filter state
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  
  // Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Get tasks from hook
  const { tasks, pagination, loading, createTask, updateTask, deleteTask, toggleComplete } = useTasks(filters, page);

  // Handle filter changes
  const handleFilterChange = (filter) => {
    setPage(1);  // Reset to page 1
    const newFilters = { ...filters };
    
    if (filter === 'all') {
      delete newFilters.completed;
    } else if (filter === 'active') {
      newFilters.completed = 'false';
    } else if (filter === 'completed') {
      newFilters.completed = 'true';
    }
    setFilters(newFilters);
  };

  // Handle task creation
  const handleAddTask = async (formData) => {
    await createTask(formData);
  };

  // Handle task update
  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (formData, taskId) => {
    await updateTask(taskId, formData);
  };

  // Handle task deletion
  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = pagination?.total || 0;

  return (
    <div className={styles.home}>
      {/* Header with Add button */}
      <div className={styles.header}>
        <h1 className={styles.title}>Tasks</h1>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FiPlus /> Add Task
        </Button>
      </div>

      <div className={styles.container}>
        {/* Filter and sort options */}
        <FilterBar
          onFilterChange={handleFilterChange}
          onSortChange={(sort) => setFilters({ ...filters, sort })}
          onSearchChange={(query) => setFilters({ ...filters, search: query })}
        />

        {/* Show loader while fetching */}
        {loading ? (
          <Loader />
        ) : tasks.length === 0 ? (
          // Show empty state if no tasks
          <EmptyState
            title="No tasks yet"
            description="Create your first task to get started"
            actionLabel="Create your first task"
            onAction={() => setIsAddModalOpen(true)}
          />
        ) : (
          <>
            {/* List of tasks */}
            <div className={styles.tasksList}>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={toggleComplete}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {/* Pagination if needed */}
            {pagination && pagination.pages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>Page {page} of {pagination.pages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Progress bar */}
        {!loading && tasks.length > 0 && (
          <ProgressBar completed={completedCount} total={totalCount} />
        )}
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTask}
      />

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateTask}
        task={selectedTask}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        taskTitle={selectedTask?.title}
      />
    </div>
  );
}

export default Home;
```

### `src/pages/Statistics.jsx`

Analytics dashboard:

```javascript
import { useEffect } from 'react';
import { useStatistics } from '../hooks/useStatistics';
import Loader from '../components/common/Loader';
import StatisticsCard from '../components/statistics/StatisticsCard';
import CompletionChart from '../components/statistics/CompletionChart';
import CategoryChart from '../components/statistics/CategoryChart';
import WeeklyChart from '../components/statistics/WeeklyChart';
import MonthlyChart from '../components/statistics/MonthlyChart';
import PriorityChart from '../components/statistics/PriorityChart';
import styles from './Statistics.module.css';

function Statistics() {
  const { statistics, loading, refetch } = useStatistics();

  // Auto-refresh statistics every 30 seconds
  useEffect(() => {
    const interval = setInterval(refetch, 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) {
    return <Loader />;
  }

  const { summary, categoryStats, priorityStats, weeklyStats, monthlyStats, insights } = statistics;

  return (
    <div className={styles.statistics}>
      <h1 className={styles.title}>Statistics & Analytics</h1>

      {/* Summary Cards */}
      <div className={styles.summaryGrid}>
        <StatisticsCard
          title="Total Tasks"
          value={summary.totalTasks}
          icon="📋"
        />
        <StatisticsCard
          title="Completed Tasks"
          value={summary.completedTasks}
          icon="✓"
        />
        <StatisticsCard
          title="Completion Rate"
          value={`${summary.completionRate}%`}
          icon="📈"
        />
        {/* More cards... */}
      </div>

      {/* Charts */}
      <div className={styles.chartsGrid}>
        <CompletionChart
          completed={summary.completedTasks}
          pending={summary.pendingTasks}
        />
        <CategoryChart categoryStats={categoryStats} />
        <WeeklyChart weeklyStats={weeklyStats} />
        <MonthlyChart monthlyStats={monthlyStats} />
        <PriorityChart priorityStats={priorityStats} />
      </div>

      {/* Insights Section */}
      {insights && (
        <div className={styles.insightsSection}>
          <h2>Insights</h2>
          <div className={styles.insightsGrid}>
            <div className={styles.insightCard}>
              <h3>Most Productive Category</h3>
              <p>{insights.mostProductiveCategory}</p>
            </div>
            {/* More insight cards... */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;
```

---

## Styling (CSS Modules)

### What are CSS Modules?

CSS Modules make styles **scoped** to one component:

```css
/* Button.module.css */
.button {
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.primary {
  background-color: #5B5CEB;
  color: white;
}

.danger {
  background-color: #EF4444;
  color: white;
}
```

```javascript
// Button.jsx
import styles from './Button.module.css';

<button className={`${styles.button} ${styles[variant]}`}>
  Click me
</button>
```

**Benefits:**
- No global name conflicts
- Easy to maintain
- Clear which styles apply to which component
- Can't accidentally affect other components

### CSS Variables

Used for themes and consistent values:

```css
:root {
  --color-primary: #5B5CEB;
  --color-bg-light: #F6F7FB;
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --transition-base: 200ms ease-in-out;
}

body.dark-mode {
  --color-primary: #7C3AED;
  --color-bg-light: #0F172A;
}

.button {
  background-color: var(--color-primary);
  transition: all var(--transition-base);
}
```

### Responsive Design

Using media queries for different screen sizes:

```css
/* Desktop first (base styles) */
.taskCard {
  display: flex;
  gap: 12px;
  padding: 16px;
}

/* Tablet */
@media (max-width: 1024px) {
  .taskCard {
    padding: 14px;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .taskCard {
    flex-direction: column;
    padding: 12px;
  }
}
```

---

## Common Patterns

### Pattern 1: Fetching Data on Component Mount

```javascript
function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await tasksAPI.getAll();
        setTasks(response.data);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);  // Empty dependency = run once on mount

  return loading ? <Loader /> : <TaskList tasks={tasks} />;
}
```

### Pattern 2: Handling Form Input

```javascript
function Form() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Personal',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent page reload
    await tasksAPI.create(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <button type="submit">Save</button>
    </form>
  );
}
```

### Pattern 3: Conditional Rendering

```javascript
{loading && <Loader />}
{!loading && error && <Error message={error} />}
{!loading && !error && tasks.length === 0 && <EmptyState />}
{!loading && !error && tasks.length > 0 && <TaskList tasks={tasks} />}
```

---

## Debugging

### Using Browser DevTools

1. **Console Tab**
   - See console.log() output
   - See error messages

2. **Network Tab**
   - See API requests
   - See request/response data
   - Check HTTP status codes

3. **React DevTools Extension**
   - Inspect component hierarchy
   - See component props and state
   - Track re-renders

### Debugging Techniques

```javascript
// Add console logs
console.log('Tasks:', tasks);
console.error('Error:', error);

// Use debugger statement
debugger;  // Execution pauses here in DevTools

// Check state in DevTools
function MyComponent() {
  const [state, setState] = useState('value');
  console.log('Current state:', state);  // Logged to console
  return <div>{state}</div>;
}
```

---

## Summary

**Key Takeaways:**
- React components are just functions that return JSX
- Custom hooks let you reuse logic
- CSS Modules keep styles scoped and safe
- API calls go through service layer
- Utilities help with common tasks like formatting dates
- Props drill data from parent to child components

This application demonstrates professional React patterns and best practices!

---

**Need Help?** Check the code itself - comments explain tricky parts!
