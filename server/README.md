# Backend - Todo Application Server

A production-ready Node.js + Express + MongoDB backend with complete authentication, validation, and error handling.

## ✨ Features

- ✅ **Authentication System**: User registration and login with JWT tokens
- ✅ **User Management**: Profile management with validation
- ✅ **Complete CRUD**: Full task management (Create, Read, Update, Delete)
- ✅ **Advanced Pagination**: Built-in pagination with limit (max 50)
- ✅ **Filtering**: By status, priority, and date
- ✅ **Sorting**: By creation date, due date, or priority
- ✅ **Input Validation**: Zod schema validation for all requests
- ✅ **Password Security**: Bcrypt hashing with salt rounds
- ✅ **Error Handling**: Centralized error middleware with clean responses
- ✅ **MongoDB Atlas**: Cloud database integration
- ✅ **Vercel Compatible**: Serverless deployment ready
- ✅ **CORS Enabled**: Configured for local dev and production
- ✅ **API Documentation**: Complete endpoint reference
- ✅ **Request Logging**: Morgan middleware for request tracking
- ✅ **Task Statistics**: Built-in analytics endpoint

## 📁 Folder Structure

```
server/
├── models/
│   ├── User.js              # User schema with password hashing
│   └── Task.js              # Task schema with indexes
├── controllers/
│   ├── authController.js    # Register, login, logout logic
│   ├── userController.js    # User profile management
│   └── taskController.js    # Task CRUD + statistics
├── routes/
│   ├── auth.js              # /api/auth endpoints
│   ├── user.js              # /api/user endpoints
│   ├── task.js              # /api/tasks endpoints
│   └── health.js            # Health check endpoints
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── validation.js        # Zod validation + async wrapper
│   └── errorHandler.js      # Global error handler
├── validators/
│   └── schemas.js           # All Zod validation schemas
├── utils/
│   ├── jwt.js               # JWT token generation/verification
│   └── response.js          # Standardized API responses
├── config/
│   └── db.js                # MongoDB connection config
├── server.js                # Main application entry point
├── package.json             # Dependencies
├── .env.example             # Environment variables template
└── API_DOCUMENTATION.md     # Complete API reference
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

```bash
# Copy the example file
copy .env.example .env

# Edit .env and add your values
# Most important:
# - MONGO_URI: Your MongoDB Atlas connection string
# - JWT_SECRET: A strong random secret (min 32 chars recommended)
```

### 3. Get MongoDB Atlas URI

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create account or login
3. Create a cluster (free tier available)
4. Click "Connect" → "Drivers" → Copy connection string
5. Replace `<password>` with your database password
6. Paste into `MONGO_URI` in `.env`

### 4. Start Development Server

```bash
npm run dev
```

Server will start on: `http://localhost:5000`

Output:
```
✓ MongoDB Connected: cluster0.xxxxx.mongodb.net/todoapp
✓ Server running on http://localhost:5000
✓ Environment: development
```

### 5. Test the API

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"Pass123"}'
```

## 🔐 Authentication Flow

### User Registration

```
POST /api/auth/register
├── Validate input (username, email, password)
├── Check if user exists
├── Hash password with bcrypt (10 rounds)
├── Save user to MongoDB
├── Generate JWT token
└── Return user + token
```

### User Login

```
POST /api/auth/login
├── Validate input
├── Find user by email
├── Compare password with hash
├── Generate JWT token
└── Return user + token
```

### Protected Routes

```
GET /api/user/me
├── Extract token from Authorization header
├── Verify JWT signature and expiry
├── Get user from database
├── Return user profile
```

## 🗄️ Database Models

### User
```javascript
{
  username: String,           // Unique, lowercase, 3-30 chars
  email: String,              // Unique, lowercase
  password: String,           // Hashed with bcrypt
  age: Number,                // Optional, 1-150
  year: String,               // Optional: 1st, 2nd, 3rd, 4th, 5th
  department: String,         // Optional
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-updated
}
```

### Task
```javascript
{
  title: String,              // Required, 3-100 chars
  description: String,        // Optional, max 500 chars
  status: String,             // "pending" or "completed"
  priority: String,           // "low", "medium", or "high"
  dueDate: Date,              // Optional, must be future date
  user: ObjectId,             // Reference to User
  tags: [String],             // Array of tags
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-updated
}
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register         # Create new user
POST   /api/auth/login            # Login user
POST   /api/auth/logout           # Logout user
```

### User (Protected)
```
GET    /api/user/me               # Get current user
PATCH  /api/user/update           # Update profile
GET    /api/user/:id              # Get user by ID
DELETE /api/user                  # Delete account
```

### Tasks (Protected)
```
POST   /api/tasks                 # Create task
GET    /api/tasks                 # Get all tasks (with pagination)
GET    /api/tasks/stats           # Get task statistics
GET    /api/tasks/:id             # Get single task
PATCH  /api/tasks/:id             # Update task
PATCH  /api/tasks/:id/complete    # Mark as completed
DELETE /api/tasks/:id             # Delete task
```

### Health Check
```
GET    /api/health                # Server health
GET    /api/health/live           # Kubernetes liveness
GET    /api/health/ready          # Kubernetes readiness
```

## 📊 Query Examples

### Get Tasks with Pagination
```
GET /api/tasks?page=1&limit=10
```

### Filter by Status
```
GET /api/tasks?status=pending
GET /api/tasks?status=completed
```

### Filter by Priority
```
GET /api/tasks?priority=high
GET /api/tasks?priority=medium&priority=low
```

### Sort by Due Date
```
GET /api/tasks?sortBy=dueDate&sortOrder=asc
```

### Combined Filters
```
GET /api/tasks?page=2&limit=5&status=pending&priority=high&sortBy=dueDate
```

## 🛡️ Security Features

### Password Security
- Hashed with bcrypt using 10 salt rounds
- Never returned in API responses
- Compared securely with `bcrypt.compare()`

### JWT Authentication
- Token generated on registration/login
- Expires after 7 days (configurable)
- Verified on protected routes
- Secret stored in environment variables

### Input Validation
- Zod schema validation on all endpoints
- Email format validation
- Password strength validation
- Type checking for all fields
- Length limits and regex patterns

### Error Handling
- Centralized error middleware
- Sensitive error details hidden in production
- Consistent error response format
- Validation errors with field names

### Database Security
- Mongoose prevents injection attacks
- Indexed queries for performance
- Connection pooling and timeouts
- User data isolation (never see other's tasks)

## 🔄 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* operation data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

### Validation Error Response
```json
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "errors": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## 🔧 Middleware Stack

1. **express.json()** - Parse JSON bodies
2. **express.urlencoded()** - Parse form data
3. **cors()** - Cross-origin resource sharing
4. **morgan()** - HTTP request logging
5. **validateRequest()** - Request validation (per route)
6. **authenticate()** - JWT verification (per route)
7**errorHandler()** - Global error handler

## 📝 Validation Rules

### Username
- Minimum: 3 characters
- Maximum: 30 characters
- Lowercase only
- Alphanumeric, underscores, hyphens
- Must be unique

### Email
- Valid email format
- Lowercase
- Unique
- Trimmed

### Password
- Minimum: 6 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain digit

### Task Title
- Minimum: 3 characters
- Maximum: 100 characters
- Required

### Task Description
- Maximum: 500 characters
- Optional

### Due Date
- Must be future date
- ISO 8601 format
- Optional

## 🚀 Production Deployment

### Vercel Deployment

1. **No changes needed** - Already compatible!
   - `app.listen()` disabled in production
   - App is exported for serverless handler
   - All routes use `/api` prefix

2. **Set environment variables** in Vercel dashboard:
   ```
   NODE_ENV=production
   MONGO_URI=<your-production-uri>
   JWT_SECRET=<strong-random-secret>
   FRONTEND_URL=<your-frontend-url>
   ```

3. **Deploy**:
   ```bash
   # Push to GitHub
   git push origin main

   # Vercel automatically deploys
   ```

### MongoDB Atlas Security

1. **Network Access**:
   - Add your IP address (or 0.0.0.0 for development)
   - Vercel deployments: Add Vercel IPs

2. **User Management**:
   - Create database user with strong password
   - Use the user in MONGO_URI

3. **Backups**:
   - Enable automatic backups
   - Test restore procedures

## 🧪 Testing API

### Using Postman

1. Create new request
2. Set method and URL
3. For protected routes:
   - Headers tab
   - Add `Authorization: Bearer <token>`
4. Send request

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'

# Get tasks (with token)
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer <token>"
```

### Using VS Code REST Client

Create `.http` or `.rest` file:

```http
### Register User
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "john",
  "email": "john@example.com",
  "password": "SecurePass123"
}

### Login
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}

@token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

### Get Current User
GET http://localhost:5000/api/user/me
Authorization: Bearer @token

### Create Task
POST http://localhost:5000/api/tasks
Authorization: Bearer @token
Content-Type: application/json

{
  "title": "Learn MongoDB",
  "priority": "high",
  "dueDate": "2024-04-15T18:00:00Z"
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error**: `MongoServerError: connect ECONNREFUSED`

**Solutions**:
1. Check MONGO_URI in .env
2. Verify IP is whitelisted in MongoDB Atlas
3. Check password contains no special chars
4. Ensure cluster is running

### Invalid Token Error

**Error**: `Invalid token` or `Token has expired`

**Solutions**:
1. Token format: `Authorization: Bearer <token>` (space between Bearer and token)
2. Token expires after 7 days (change JWT_EXPIRE if needed)
3. JWT_SECRET must match between login and verification

### CORS Error

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. Check FRONTEND_URL in .env
2. Verify frontend URL matches CORS origins in server.js
3. Ensure Origin header is sent from frontend

### Port Already in Use

**Error**: `Error: listen EADDRINUSE :::5000`

**Solution**:
```powershell
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

### Cannot GET / Error

**Issue**: Root path returns 404 or error

**Solution**: This is expected! Access `/api/health` or `/api/auth/login` instead.

## 📚 Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| express | Web framework | ^4.18.2 |
| mongoose | MongoDB ODM | ^7.5.0 |
| dotenv | Environment variables | ^16.3.1 |
| cors | CORS middleware | ^2.8.5 |
| morgan | Request logging | ^1.10.0 |
| bcrypt | Password hashing | ^5.1.0 |
| jsonwebtoken | JWT tokens | ^9.0.2 |
| zod | Input validation | ^3.22.4 |
| nodemon | Dev server | ^3.0.1 |

## 📖 Documentation

- **API_DOCUMENTATION.md** - Complete API reference with examples
- **README.md** - Full project documentation
- **SETUP.md** - Step-by-step setup guide

## 🔗 Related Files

- Frontend: `../../client/`
- Root README: `../../README.md`
- Project SETUP: `../../SETUP.md`

## 💡 Tips & Best Practices

1. **Always include `Authorization` header** for protected routes
2. **Use descriptive error messages** in responses
3. **Validate on both client and server** for security
4. **Keep tokens in backend** (httpOnly cookies recommended for production)
5. **Monitor logs** using Morgan or similar in production
6. **Implement rate limiting** for production (token-based)
7. **Use environment variables** for all sensitive data
8. **Regular backups** of MongoDB database
9. **Monitor MongoDB Atlas** for quota issues
10. **Test all endpoints** before production deployment

## 🎯 Next Steps

1. ✅ Backend setup complete
2. Frontend integration ready
3. Deploy to Vercel
4. Add more features:
   - Sharing tasks with other users
   - Task comments and discussions
   - Reminder notifications
   - Export tasks as PDF

---

**Production-ready backend with enterprise-grade security and best practices.** 🚀
