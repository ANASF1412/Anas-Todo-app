#!/usr/bin/env node

/**
 * 🚀 MERN Todo Application - Complete Setup & Run Guide
 * 
 * This guide helps you get the entire MERN application running locally
 * with both frontend and backend fully integrated.
 */

console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║                  🚀 MERN Todo Application Setup                        ║
║              Production-Ready Full Stack Application                   ║
╚════════════════════════════════════════════════════════════════════════╝

✨ What's Included:
  ✅ Backend: Node.js + Express + MongoDB
  ✅ Frontend: React + Vite + Tailwind CSS
  ✅ Authentication: JWT + Bcrypt
  ✅ Database: MongoDB Atlas Integration
  ✅ Validation: Zod Input Validation
  ✅ Error Handling: Global Error Middleware
  ✅ API Documentation: Complete Reference
  ✅ Production Ready: Vercel Compatible

═══════════════════════════════════════════════════════════════════════════

📋 STEP-BY-STEP SETUP
═══════════════════════════════════════════════════════════════════════════

STEP 1️⃣  - Get MongoDB URI
────────────────────────────────────────────────────────────────────────
  1. Go to https://www.mongodb.com/cloud/atlas
  2. Create free account or login
  3. Create a new cluster (free tier available)
  4. Click "Connect" → "Driver" (Node.js)
  5. Copy connection string
  6. Example: mongodb+srv://username:password@cluster.mongodb.net/todoapp


STEP 2️⃣  - Setup Backend Environment
────────────────────────────────────────────────────────────────────────
  cd server
  
  # Copy example file
  copy .env.example .env
  
  # Edit .env and set:
  # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
  # JWT_SECRET=your_strong_secret_key_min_32_chars
  
  # Install dependencies
  npm install


STEP 3️⃣  - Setup Frontend Environment
────────────────────────────────────────────────────────────────────────
  cd client
  
  # Copy example file
  copy .env.example .env
  
  # Leave default values (should point to localhost:5000)
  # Content:
  # VITE_API_URL=http://localhost:5000
  
  # Install dependencies
  npm install


STEP 4️⃣  - Start Backend
────────────────────────────────────────────────────────────────────────
  cd server
  npm run dev
  
  Expected output:
    ✓ MongoDB Connected: ...
    ✓ Server running on http://localhost:5000
  
  Test: curl http://localhost:5000/api/health


STEP 5️⃣  - Start Frontend (New Terminal)
────────────────────────────────────────────────────────────────────────
  cd client
  npm run dev
  
  Expected output:
    ✓ Local:   http://localhost:5173
  
  Open in browser: http://localhost:5173


═══════════════════════════════════════════════════════════════════════════

🎯 TESTING YOUR SETUP
═══════════════════════════════════════════════════════════════════════════

Test 1: Backend Health Check
────────────────────────────────────────────────────────────────────────
  curl http://localhost:5000/api/health
  
  Expected: { "status": "success", "message": "Server is healthy" }


Test 2: User Registration
────────────────────────────────────────────────────────────────────────
  curl -X POST http://localhost:5000/api/auth/register \\
    -H "Content-Type: application/json" \\
    -d '{
      "username": "testuser",
      "email": "test@example.com",
      "password": "TestPass123"
    }'
  
  Expected: JWT token in response


Test 3: Frontend Connection
────────────────────────────────────────────────────────────────────────
  1. Open http://localhost:5173 in browser
  2. Look for "Connected" badge in top-right
  3. Should show green with checkmark


═══════════════════════════════════════════════════════════════════════════

📁 PROJECT STRUCTURE
═══════════════════════════════════════════════════════════════════════════

e:\\Anas Todo List\\
├── server/                          Backend
│   ├── models/                      MongoDB schemas
│   │   ├── User.js
│   │   └── Task.js
│   ├── controllers/                 Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── taskController.js
│   ├── routes/                      API endpoints
│   │   ├── auth.js
│   │   ├── user.js
│   │   └── task.js
│   ├── middleware/                  Express middleware
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── validators/                  Zod schemas
│   │   └── schemas.js
│   ├── utils/                       Helper functions
│   │   ├── jwt.js
│   │   └── response.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── API_DOCUMENTATION.md        ← Complete API Reference
│   ├── README.md
│   └── BACKEND_SUMMARY.md
│
├── client/                          Frontend
│   ├── src/
│   │   ├── components/              React components
│   │   │   ├── Header.jsx
│   │   │   ├── TodoForm.jsx
│   │   │   └── TodoItem.jsx
│   │   ├── pages/                   Page components
│   │   │   ├── Home.jsx
│   │   │   └── NotFound.jsx
│   │   ├── context/
│   │   │   └── TodoContext.jsx      State management
│   │   ├── services/
│   │   │   └── api.js               API client → Backend
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── .env.example
│
├── .env.example
├── .gitignore
├── package.json                     Root scripts
├── vercel.json                      Vercel config
├── README.md
└── SETUP.md


═══════════════════════════════════════════════════════════════════════════

🔌 API ENDPOINTS
═══════════════════════════════════════════════════════════════════════════

Authentication
  POST   /api/auth/register          Create account
  POST   /api/auth/login             Login
  POST   /api/auth/logout            Logout

User (Protected)
  GET    /api/user/me                Get profile
  PATCH  /api/user/update            Update profile
  GET    /api/user/:id               Get user by ID
  DELETE /api/user                   Delete account

Tasks (Protected)
  POST   /api/tasks                  Create task
  GET    /api/tasks                  Get all tasks (pagination, filtering)
  GET    /api/tasks/:id              Get single task
  PATCH  /api/tasks/:id              Update task
  DELETE /api/tasks/:id              Delete task
  PATCH  /api/tasks/:id/complete     Mark completed
  GET    /api/tasks/stats            Get statistics

Health
  GET    /api/health                 Server health
  GET    /api/health/live            Kubernetes liveness
  GET    /api/health/ready           Kubernetes readiness


═══════════════════════════════════════════════════════════════════════════

🔐 HOW AUTHENTICATION WORKS
═══════════════════════════════════════════════════════════════════════════

1. User Registers
   └─→ Username, email, password sent
   └─→ Password hashed with bcrypt (10 rounds)
   └─→ User saved to MongoDB
   └─→ JWT token generated (7-day expiry)
   └─→ Token sent to frontend

2. User Logs In
   └─→ Email, password sent
   └─→ User found by email
   └─→ Password verified with bcrypt.compare()
   └─→ New JWT token generated
   └─→ Token sent to frontend

3. Protected Routes
   └─→ Frontend includes token in Authorization header
   └─→ Backend verifies JWT signature
   └─→ User ID extracted from token
   └─→ User loaded from database
   └─→ Request proceeds

4. Token Expiry
   └─→ Token expires after 7 days
   └─→ User needs to login again
   └─→ New token generated


═══════════════════════════════════════════════════════════════════════════

📊 VALIDATION & SECURITY
═══════════════════════════════════════════════════════════════════════════

Username Validation
  • Minimum 3 characters
  • Maximum 30 characters
  • Lowercase only
  • Alphanumeric, underscores, hyphens
  • Unique in database

Password Validation
  • Minimum 6 characters
  • Must have uppercase letter
  • Must have lowercase letter
  • Must have digit
  • Hashed before storage

Email Validation
  • Valid email format
  • Lowercase
  • Unique in database

Task Title
  • Minimum 3 characters
  • Maximum 100 characters
  • Required field

Due Date
  • Must be future date
  • ISO 8601 format
  • Optional field


═══════════════════════════════════════════════════════════════════════════

⚙️ USEFUL COMMANDS
═══════════════════════════════════════════════════════════════════════════

From root directory:

npm run setup              Install all dependencies
npm run dev               Start both servers (concurrent)
npm run dev:server        Start backend only
npm run dev:client        Start frontend only
npm run build:all         Build both for production

From server/:

npm run dev               Start development server
npm start                 Start production server

From client/:

npm run dev               Start Vite dev server
npm run build             Build for production
npm run preview           Preview production build


═══════════════════════════════════════════════════════════════════════════

🐛 TROUBLESHOOTING
═══════════════════════════════════════════════════════════════════════════

✗ MongoDB Connection Failed
  └─ Check MONGO_URI in server/.env
  └─ Verify IP is whitelisted in MongoDB Atlas
  └─ Ensure password has no special chars
  └─ Check cluster is running

✗ Port Already in Use
  └─ Windows: taskkill /PID <PID> /F
  └─ Port 5000 (backend): netstat -ano | findstr :5000
  └─ Port 5173 (frontend): netstat -ano | findstr :5173

✗ CORS Error
  └─ Check FRONTEND_URL in server/.env
  └─ Verify frontend is running on localhost:5173
  └─ Clear browser cache

✗ Token Invalid
  └─ Format: Authorization: Bearer <token>
  └─ Not "Bearer token" or "JWT token"
  └─ 7-day expiry - need to login again

✗ Module Not Found
  └─ Delete node_modules folder
  └─ Run npm install again
  └─ Check all dependencies in package.json

✗ Cannot GET / Error
  └─ This is expected! Access /api/health instead
  └─ Frontend is at localhost:5173
  └─ Backend API is at localhost:5000/api


═══════════════════════════════════════════════════════════════════════════

📚 DOCUMENTATION FILES
═══════════════════════════════════════════════════════════════════════════

Root Level
  README.md               Full project documentation
  SETUP.md                Step-by-step setup guide

Backend
  server/README.md        Backend-specific docs
  server/API_DOCUMENTATION.md  Complete API reference
  server/BACKEND_SUMMARY.md    Architecture summary

Frontend
  client/README.md        Frontend setup (coming)


═══════════════════════════════════════════════════════════════════════════

🚀 PRODUCTION DEPLOYMENT
═══════════════════════════════════════════════════════════════════════════

To Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - NODE_ENV=production
   - MONGO_URI=<production_mongodb_uri>
   - JWT_SECRET=<strong_secret_key>
   - FRONTEND_URL=<your_vercel_url>
4. Deploy automatically

The backend is already configured for Vercel serverless!


═══════════════════════════════════════════════════════════════════════════

✨ YOU'RE ALL SET!
═══════════════════════════════════════════════════════════════════════════

Your production-ready MERN Todo application is complete with:

✅ Full authentication system
✅ MongoDB database integration
✅ Complete CRUD operations
✅ Advanced pagination & filtering
✅ Input validation with Zod
✅ Comprehensive error handling
✅ JWT token management
✅ Password hashing with bcrypt
✅ React Context state management
✅ Beautiful Tailwind UI
✅ Vercel deployment ready
✅ Full API documentation

═══════════════════════════════════════════════════════════════════════════

📞 Next Steps:

1. Run: npm run setup (from root)
2. Configure .env files with MongoDB URI
3. Start servers: npm run dev
4. Open: http://localhost:5173
5. Register and start using the app!

═══════════════════════════════════════════════════════════════════════════

Happy coding! 🎉
`);
