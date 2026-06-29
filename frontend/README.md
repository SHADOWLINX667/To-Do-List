# Todo Frontend

A modern, responsive React application for task management built with Vite.

## Features

- ✓ Modern minimal UI with light/dark mode
- ✓ Responsive design (mobile, tablet, desktop)
- ✓ Create, read, update, delete tasks
- ✓ Filter and sort tasks
- ✓ Search functionality
- ✓ Task categories and priorities
- ✓ Completion tracking
- ✓ Statistics dashboard with charts
- ✓ Real-time updates

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Run development server:
```bash
npm run dev
```

Application will open at `http://localhost:5173`

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   ├── layout/          # Layout components
│   ├── task/            # Task-related components
│   └── statistics/      # Statistics components
├── pages/               # Page components
├── hooks/               # Custom React hooks
├── services/            # API services
├── utils/               # Utility functions
├── styles/              # Global styles
└── assets/              # Images, icons, etc
```

## Deployment to Vercel

1. Connect GitHub repository to Vercel
2. Set environment variable `VITE_API_URL` to your backend URL
3. Deploy

## Technologies

- React 19
- Vite
- React Router
- Axios
- Chart.js
- CSS Modules
- React Icons
