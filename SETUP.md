# 🚀 Quick Start Setup Guide

Complete step-by-step instructions to get your Todo app running locally.

## ✅ Prerequisites

Before starting, make sure you have:
- **Node.js** v16+ installed ([Download](https://nodejs.org/))
- **npm** v8+ (comes with Node.js)
- **MongoDB Atlas** account (Free at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))

## 🔧 Step 1: Get MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or login
3. Create a new cluster (Free tier)
4. Click "Connect" → "Drivers" → Copy your connection string
5. Replace `<password>` with your database password
6. Example: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todoapp?retryWrites=true&w=majority`

## 📦 Step 2: Setup Environment Variables

### Option A: Using Root .env (Recommended)

```bash
# In project root folder, create .env file
copy .env.example .env

# Then edit .env and add your MongoDB URI
# Replace: mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
```

### Option B: Individual .env Files

**Backend:**
```bash
# In server/ folder
copy .env.example .env

# Edit and add MONGO_URI
```

**Frontend:**
```bash
# In client/ folder
copy .env.example .env

# Should default to http://localhost:5000 (usually fine)
```

## 🎯 Step 3: Install Dependencies

### Quick Install (From Root)

```bash
# Install everything at once
npm run setup
```

### Manual Install

```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install
```

## ▶️ Step 4: Run the Application

### Option A: From Root (Both servers at once)

```bash
npm run dev
```

This will start:
- Backend on `http://localhost:5000`
- Frontend on `http://localhost:5173`

### Option B: Separate Terminals

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

## ✨ Step 5: Test the Application

1. Open `http://localhost:5173` in your browser
2. You should see the Todo app with a purple gradient
3. Try adding a todo
4. If you see a "Connected" badge → Server is working! ✓

## ⚠️ Troubleshooting

### Port Already in Use

**Windows:**
```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# For port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### MongoDB Connection Error

```
Error: ECONNREFUSED or MongoServerError
```

**Solutions:**
1. Check your MONGO_URI in .env
2. Verify IP whitelist in MongoDB Atlas
   - Go to Network Access
   - Add your IP address (or 0.0.0.0 for development)
3. Ensure cluster is running
4. Check password doesn't contain special characters (URL encode if needed)

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
```

### CORS Error

```
Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**
1. Check backend is running on `http://localhost:5000`
2. Verify VITE_API_URL in client/.env
3. Restart both servers

## 📁 Project Structure

```
e:/Anas Todo List/
├── server/                  # Backend (Express, MongoDB)
│   ├── routes/health.js    # API routes
│   ├── config/db.js        # Database config
│   ├── server.js           # Main server
│   ├── package.json
│   └── .env.example
│
├── client/                  # Frontend (React, Vite, Tailwind)
│   ├── src/
│   │   ├── components/     # Button, Form, Item components
│   │   ├── pages/          # Home, NotFound pages
│   │   ├── context/        # TodoContext for state
│   │   ├── services/       # API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css       # Global Tailwind styles
│   ├── package.json
│   └── .env.example
│
├── .env.example            # Combined environment variables
├── package.json            # Root scripts for dev/build
├── vercel.json            # Vercel deployment config
├── .gitignore             # Git ignore settings
├── README.md              # Full documentation
└── SETUP.md              # This file
```

## 🌐 Accessing the App

| Service | URL | Status |
|---------|-----|--------|
| Frontend | `http://localhost:5173` | Open in browser |
| Backend | `http://localhost:5000` | Check `/api/health` |
| DB | MongoDB Atlas | Cloud hosted |

## 🚀 Next Steps

### Add More Features:
1. Create Todo model in backend
2. Add todo routes (GET, POST, PUT, DELETE)
3. Connect frontend to backend

### Deploy to Vercel:
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables
4. Deploy!

## 📚 Useful Commands

```bash
# Development
npm run dev              # Run both servers
npm run dev:server      # Run backend only
npm run dev:client      # Run frontend only

# Production
npm run build:all       # Build both projects
npm run start:server    # Start backend only
npm run start:client    # Start frontend preview

# Cleanup
npm run setup           # Reinstall everything
```

## 🔗 Useful Links

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Mongoose Docs](https://mongoosejs.com/)

## ❓ Need Help?

1. Check the [README.md](README.md) for full documentation
2. Review error messages carefully
3. Check browser console for errors (F12)
4. Verify all environment variables are set correctly

---

**You're all set! Happy coding! 🎉**
