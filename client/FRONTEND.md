# Todo Application - Frontend Documentation

## Overview

A production-ready, premium React frontend for a full-stack Todo application built with modern technologies and best practices. The application features a sleek dark-themed UI with smooth animations, comprehensive task management, and seamless API integration.

## 🎨 Frontend Architecture

### Project Structure

```
client/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.jsx      # Route protection for authenticated users
│   │   ├── Toast.jsx                # Toast notification system
│   │   ├── TaskCard.jsx             # Individual task display component
│   │   ├── TaskForm.jsx             # Reusable form for create/edit tasks
│   │   ├── Modal.jsx                # Reusable modal wrapper
│   │   ├── TaskFilters.jsx          # Filter/sort controls
│   │   ├── EmptyState.jsx           # Empty state placeholder
│   │   └── LoadingSkeleton.jsx      # Loading skeleton UI
│   ├── context/
│   │   ├── AuthContext.jsx          # Authentication state management
│   │   └── ToastContext.jsx         # Toast notification state
│   ├── hooks/
│   │   ├── useAuth.js              # Hook for auth context access
│   │   ├── useToast.js             # Hook for toast context access
│   │   └── useTasks.js             # Hook for task CRUD operations
│   ├── pages/
│   │   ├── Login.jsx               # Login page with form validation
│   │   ├── Register.jsx            # Registration page with extended validation
│   │   └── Dashboard.jsx           # Main dashboard with task management
│   ├── services/
│   │   └── api.js                  # Axios instance with interceptors
│   ├── App.jsx                     # Main app component with routing
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles and animations
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🔐 Authentication & State Management

### Auth Context (`context/AuthContext.jsx`)

Manages global authentication state with localStorage persistence:

```javascript
const authContext = {
  isAuthenticated: boolean,
  user: {
    _id: string,
    username: string,
    email: string,
    age?: number,
    year?: string,
    department?: string
  },
  token: string,
  loading: boolean,
  login: (user, token) => void,
  logout: () => void,
  updateUser: (user) => void
}
```

**Features:**
- Persists token and user to localStorage
- Auto-restores session on page reload
- Provides login/logout/updateUser methods
- Centralized token management

### Toast Context (`context/ToastContext.jsx`)

Manages notification state for user feedback:

```javascript
const toastContext = {
  toasts: [
    {
      id: unique_id,
      message: string,
      type: 'success' | 'error' | 'info' | 'warning'
    }
  ],
  addToast: (message, type) => void,
  removeToast: (id) => void
}
```

**Features:**
- Auto-dismiss toasts after 3 seconds
- Queue multiple notifications
- Type-based styling (success, error, info, warning)
- Global notification system

## 🪝 Custom Hooks

### useAuth
```javascript
const { isAuthenticated, user, token, loading, login, logout, updateUser } = useAuth();
```
Hook for accessing authentication state throughout the app.

### useToast
```javascript
const { addToast, removeToast } = useToast();
```
Hook for showing notifications anywhere in the app.

### useTasks
```javascript
const {
  tasks,                    // Array of tasks
  stats,                    // { total, completed, pending, highPriority }
  loading,                  // Loading state
  fetchTasks,              // (params) => fetch with filters
  fetchStats,              // () => fetch task statistics
  createTask,              // (data) => create new task
  updateTask,              // (id, data) => update existing task
  deleteTask,              // (id) => delete task
  completeTask             // (id) => mark as completed
} = useTasks();
```
Hook for comprehensive task management with automatic error handling and toast feedback.

## 🌐 API Service Layer

### API Client (`services/api.js`)

Axios instance with built-in interceptors:

**Request Interceptor:**
- Automatically attaches JWT token from localStorage to `Authorization` header
- Ensures all authenticated requests include valid credentials

**Response Interceptor:**
- Handles 401 Unauthorized responses
- Auto-logout and redirects to `/login` on token expiry
- Clears localStorage on authentication failure

**Endpoint Groups:**

```javascript
// Authentication
authAPI.register(userData)     // POST /api/auth/register
authAPI.login(credentials)     // POST /api/auth/login
authAPI.logout()               // POST /api/auth/logout

// User Management
userAPI.getMe()                // GET /api/user/me
userAPI.updateProfile(data)    // PATCH /api/user/update
userAPI.getUserById(id)        // GET /api/user/:id
userAPI.deleteAccount()        // DELETE /api/user/

// Task Management
taskAPI.createTask(data)       // POST /api/tasks
taskAPI.getTasks(params)       // GET /api/tasks?status=...&priority=...&sortBy=...
taskAPI.getTask(id)            // GET /api/tasks/:id
taskAPI.updateTask(id, data)   // PATCH /api/tasks/:id
taskAPI.deleteTask(id)         // DELETE /api/tasks/:id
taskAPI.completeTask(id)       // PATCH /api/tasks/:id/complete
taskAPI.getStats()             // GET /api/tasks/stats

// Health Check
healthAPI.check()              // GET /api/health
```

## 📄 Pages

### Login Page (`pages/Login.jsx`)

- Email/password form with validation
- Password visibility toggle
- Loading state during submission
- Real-time field error display
- Link to registration page
- Gradient glass-morphism design

### Register Page (`pages/Register.jsx`)

- Comprehensive form with validation:
  - Username (3+ chars, alphanumeric, lowercase)
  - Email (valid format)
  - Password (6+ chars, uppercase, lowercase, digit)
  - Optional: Age, Year, Department
- Character count display
- Form validation feedback
- Link to login page
- Consistent design with login page

### Dashboard Page (`pages/Dashboard.jsx`)

- **Collapsible Sidebar:**
  - Logo/Brand
  - Navigation menu
  - User info display
  - Logout button
  - Toggle collapse button

- **Top Navigation:**
  - Welcome message
  - New task button

- **Statistics Cards:**
  - Total tasks count
  - Completed tasks count
  - Pending tasks count
  - High-priority tasks count

- **Task Management:**
  - Filter by status (all/pending/completed)
  - Filter by priority (all/low/medium/high)
  - Sort by (due date, priority, creation date, title)
  - Create/edit/delete task modals
  - Task completion toggle
  - Empty state when no tasks
  - Loading skeleton animation

## 🧩 Components

### TaskCard
Displays individual task with:
- Title and description
- Priority badge (color-coded)
- Status badge
- Tags display
- Due date with overdue indicator
- Action buttons (Complete, Edit, Delete)
- Delete confirmation dialog

### TaskForm
Reusable form for creating/editing tasks:
- Title input with character counter
- Description textarea (500 chars max)
- Priority dropdown
- Due date picker
- Tags input (comma-separated)
- Real-time validation
- Submit/Cancel buttons

### Modal
Generic modal wrapper with:
- Backdrop overlay
- Close button
- Title header
- Smooth animations
- Click-outside-to-close

### TaskFilters
Filter and sort controls:
- Status filter (radio buttons)
- Priority filter (radio buttons)
- Sort by dropdown

### Toast
Toast notification display with:
- Type-based styling
- Smooth animations
- Auto-dismiss

### ProtectedRoute
Wrapper component for routes requiring authentication:
- Redirects unauthenticated users to `/login`
- Shows loading spinner while checking auth
- Seamlessly passes down to route component

### EmptyState
Placeholder shown when no tasks exist

### LoadingSkeleton
Animated skeleton loader for task cards

## 🔐 Authentication Flow

1. **Registration:**
   - User fills registration form
   - Form validation (client-side)
   - Submit to `authAPI.register()`
   - Backend validation and user creation
   - JWT token returned
   - Token stored in localStorage
   - AuthContext updated
   - Redirect to `/dashboard`

2. **Login:**
   - User fills login form
   - Form validation (client-side)
   - Submit to `authAPI.login()`
   - Credentials validated on backend
   - JWT token returned
   - Token stored in localStorage
   - AuthContext updated
   - Redirect to `/dashboard`

3. **Token Management:**
   - Token attached to all requests via axios interceptor
   - Token sent in `Authorization: Bearer {token}` header
   - Backend validates token in auth middleware
   - On 401 response: auto-logout, clear storage, redirect to `/login`

4. **Logout:**
   - User clicks logout button
   - AuthContext.logout() called
   - Token removed from localStorage
   - User data cleared
   - Redirect to `/login`

## 🎨 UI/UX Features

### Design System
- **Color Scheme:** Dark slate blues with accent blue highlights
- **Typography:** System fonts with optimized weights
- **Spacing:** Consistent Tailwind scale
- **Shadows:** Subtle depth with shadow-lg, shadow-2xl

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg
- Flexible grid layouts
- Adapts sidebar for mobile

### Animations
- **fade-in:** 0.3s ease-out (overlays, pages)
- **slide-up:** 0.3s ease-out (modals, notifications)
- **slide-in:** 0.3s ease-out (toasts, cards)
- **pulse-soft:** 2s infinite (loading states)
- Smooth transitions on hover states

### Interactions
- Hover effects on buttons and cards
- Loading spinners during async operations
- Form validation feedback
- Delete confirmation dialogs
- Toast notifications for all actions

## 🔧 Configuration

### Environment Variables

Create `.env` file in `client/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Or use default: `http://localhost:5000/api`

### Build Configuration

**vite.config.js:**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

**tailwind.config.js:**
- Configured with custom colors
- Extends default theme
- Dark mode support (slate colors)

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^18.2.0 | UI library |
| react-dom | ^18.2.0 | React DOM rendering |
| react-router-dom | ^6.16.0 | Client-side routing |
| axios | ^1.5.0 | HTTP client |
| vite | ^4.4.9 | Build tool & dev server |
| tailwindcss | ^3.3.3 | Utility-first CSS |
| postcss | ^8.4.31 | CSS transformation |
| autoprefixer | ^10.4.16 | CSS vendor prefixing |

## 🚀 Getting Started

### Installation

```bash
cd client
npm install
```

### Development Server

```bash
npm run dev
```

Server runs at `http://localhost:5173`

### Production Build

```bash
npm run build
```

Output: `dist/` directory (ready for deployment)

### Preview Build

```bash
npm run preview
```

Test production build locally

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- ✅ Register with valid & invalid data
- ✅ Login with valid & invalid credentials
- ✅ Logout functionality
- ✅ Session persistence on page reload
- ✅ Auto-logout on token expiry (401)

**Task Management:**
- ✅ Create task with all fields
- ✅ Create task with only title (optional fields)
- ✅ Edit existing task
- ✅ Delete task with confirmation
- ✅ Mark task as complete
- ✅ Filter by status
- ✅ Filter by priority
- ✅ Sort by different options

**UI/UX:**
- ✅ Responsive on mobile/tablet/desktop
- ✅ Animations play smoothly
- ✅ Notifications appear and auto-dismiss
- ✅ Error messages display correctly
- ✅ Loading states show properly
- ✅ Empty state displays when appropriate
- ✅ Sidebar collapse/expand works
- ✅ Modal opens/closes smoothly

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (single column, simplified sidebar)
- **Tablet:** 768px - 1024px (2-column grid)
- **Desktop:** > 1024px (3-column grid, full sidebar)

## 🔗 API Integration

All API calls go through the axios instance in `services/api.js`:

```javascript
// Example: Create task
try {
  const response = await taskAPI.createTask({
    title: "Buy groceries",
    description: "Milk, eggs, bread",
    priority: "medium",
    dueDate: "2024-01-15",
    tags: ["shopping", "personal"]
  });
  
  // response.data = {
  //   success: true,
  //   message: "Task created successfully",
  //   data: { task }
  // }
} catch (error) {
  // Error automatically shown in toast
  // On 401: auto-redirect to /login and logout
}
```

## 🚀 Deployment

### Vercel
```bash
npm run build
# Push dist/ folder to Vercel
```

### Other Platforms
- Build: `npm run build`
- Serve: `dist/` folder
- Ensure API endpoint is accessible

## 📊 Performance

- **Lazy loading:** Components with suspense
- **Code splitting:** Automatic via Vite
- **Bundle size:** ~85KB (gzipped)
- **Optimization:** Tree-shaking, minification

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| API requests failing | Check `VITE_API_URL` environment variable and backend server |
| Token not persisting | Clear localStorage and re-login |
| Styles not loading | Ensure Tailwind CSS is built via PostCSS |
| Routes not working | Verify React Router setup in App.jsx |
| Modals not showing | Check z-index values in CSS |

## 📝 Notes

- All async operations include error handling
- Form validation happens client-side before submission
- Backend validates all input again
- Token auto-attached to all authenticated requests
- All API errors converted to user-friendly toasts
- State management uses React Context (no Redux needed)
- Custom hooks provide clean API for components

## 🔒 Security

- Tokens stored in localStorage (accessible to JS)
- Consider using httpOnly cookies for production
- All sensitive data sent over HTTPS
- CORS configured on backend
- Input validation on client and server
- Password minimum requirements enforced

## 📄 License

MIT

---

**Last Updated:** 2024
**Frontend Version:** 1.0.0
**Status:** Production Ready ✅
