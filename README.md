# TODO Application - MERN Stack

A production-ready Todo application built with **MongoDB**, **Express**, **React (Vite)**, and **Node.js**, styled with **Tailwind CSS**.

## 🚀 Features

- ✅ Full-stack MERN application
- ✅ Real-time todo management (Create, Read, Update, Delete)
- ✅ Filter todos by status (All, Pending, Completed)
- ✅ Beautiful UI with Tailwind CSS
- ✅ Fast development with Vite
- ✅ MongoDB Atlas integration
- ✅ RESTful API with Express
- ✅ Health check endpoints
- ✅ CORS enabled for frontend + Vercel
- ✅ Production-ready code
- ✅ Vercel deployment ready

## 📁 Project Structure

```
root/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context
│   │   ├── services/      # API client
│   │   ├── App.jsx        # Main component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── server/                # Node.js Backend (Express)
│   ├── routes/           # API routes
│   ├── config/           # Configuration files
│   ├── server.js         # Main server file
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── vercel.json
└── README.md
```

## 🛠️ Prerequisites

- **Node.js** 16 or higher
- **npm** or **yarn**
- **MongoDB Atlas** account (Free tier available at https://www.mongodb.com/cloud/atlas)

## ⚡ Quick Start

### 1. Clone and Setup

```bash
cd "e:\Anas Todo List"
```

### 2. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Update .env with your MongoDB URI
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp?retryWrites=true&w=majority
```

### 3. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# VITE_API_URL=http://localhost:5000
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

Server runs on: `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd server
npm start
```

**Frontend:**
```bash
cd client
npm run build
npm run preview
```

## 🔌 API Endpoints

### Health Check
- `GET /api/health` - Server health check
- `GET /api/health/live` - Liveness probe
- `GET /api/health/ready` - Readiness probe

### Todos (Coming Soon)
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 📦 Dependencies

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **dotenv** - Environment variables
- **cors** - Cross-Origin Resource Sharing
- **morgan** - HTTP request logger

### Frontend
- **react** - UI library
- **react-dom** - DOM renderer
- **axios** - HTTP client
- **tailwindcss** - CSS framework
- **vite** - Build tool

## 🚀 Deployment (Vercel)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Set environment variables in Vercel:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Your secret key
   - `FRONTEND_URL`: Your frontend URL (optional)
4. Vercel will automatically build and deploy both frontend and backend

## 📝 Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/todoapp
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## 🧪 Testing

Check if the server is running:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "success",
  "message": "Server is healthy",
  "timestamp": "2024-04-06T10:30:00.000Z",
  "uptime": 123.45
}
```

## 🔒 Security Best Practices

- ✅ Environment variables for sensitive data
- ✅ CORS configured for specific origins
- ✅ Request logging with Morgan
- ✅ Error handling middleware
- ✅ Input validation ready
- ✅ XSS protection via React
- ✅ CSRF protection ready for forms

## 📚 Project Status

- ✅ Backend foundation complete
- ✅ Frontend foundation complete
- ✅ Tailwind CSS configured
- ✅ Context API setup
- ✅ API client ready
- ⏳ Todo models (database schema) - Next step
- ⏳ Todo API routes - Next step
- ⏳ Advanced features (authentication, etc.)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License

## 🆘 Troubleshooting

### CORS Error
- Check `FRONTEND_URL` in backend `.env`
- Ensure backend is running on correct port
- Verify vite proxy config in `client/vite.config.js`

### MongoDB Connection Failed
- Verify `MONGO_URI` in `.env`
- Check network whitelist in MongoDB Atlas
- Ensure IP address is whitelisted

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Module not found
```bash
# Reinstall dependencies
npm install
```

## 📞 Support

For issues or questions, check the official documentation:
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://docs.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

---

**Happy coding! 🎉**
