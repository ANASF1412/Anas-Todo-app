# Todo Backend API Documentation

Production-ready RESTful API for the Todo application with full authentication, validation, and error handling.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Update .env with your MongoDB URI and JWT secret

# Development
npm run dev

# Production
npm start
```

Server runs on: `http://localhost:5000`

## 📋 Project Structure

```
server/
├── models/              # MongoDB Mongoose schemas
│   ├── User.js         # User model with password hashing
│   └── Task.js         # Task model
├── controllers/         # Business logic
│   ├── authController.js
│   ├── userController.js
│   └── taskController.js
├── routes/             # API endpoints
│   ├── auth.js
│   ├── user.js
│   └── task.js
├── middleware/         # Express middleware
│   ├── auth.js        # JWT authentication
│   ├── validation.js  # Request validation
│   └── errorHandler.js # Global error handling
├── validators/         # Request validation schemas
│   └── schemas.js     # Zod validation schemas
├── utils/             # Utility functions
│   ├── jwt.js         # JWT token handling
│   └── response.js    # API response formatting
├── config/            # Configuration
│   └── db.js          # Database connection
├── server.js          # Main application file
└── package.json
```

## 🔐 Authentication

### Register User
**POST** `/api/auth/register`

Request body:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePassword123",
  "age": 25,
  "year": "2nd",
  "department": "Computer Science"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "username": "johndoe",
      "email": "john@example.com",
      "age": 25,
      "year": "2nd",
      "department": "Computer Science",
      "createdAt": "2024-04-06T10:30:00.000Z",
      "updatedAt": "2024-04-06T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

Validation rules:
- Username: 3-30 characters, lowercase only, no special chars
- Email: Valid email format, unique
- Password: Min 6 chars, must include uppercase, lowercase, digit
- Age: 1-150 (optional)
- Year: 1st, 2nd, 3rd, 4th, or 5th (optional)
- Department: Any string (optional)

### Login User
**POST** `/api/auth/login`

Request body:
```json
{
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { /* user object */ },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Logout
**POST** `/api/auth/logout`

No authentication required.

Response:
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## 👤 User Routes

All user routes require authentication. Include token in header:
```
Authorization: Bearer <token>
```

### Get Current User
**GET** `/api/user/me`

Response:
```json
{
  "success": true,
  "message": "User profile retrieved",
  "data": { /* user object */ }
}
```

### Update User
**PATCH** `/api/user/update`

Request body (all optional):
```json
{
  "username": "newusername",
  "age": 26,
  "year": "3rd",
  "department": "Updated Department"
}
```

Response:
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": { /* updated user object */ }
}
```

### Get User by ID
**GET** `/api/user/:id`

Response:
```json
{
  "success": true,
  "message": "User retrieved",
  "data": { /* user object */ }
}
```

### Delete User Account
**DELETE** `/api/user`

Response:
```json
{
  "success": true,
  "message": "User account deleted successfully"
}
```

## 📝 Task Routes

All task routes require authentication.

### Create Task
**POST** `/api/tasks`

Request body:
```json
{
  "title": "Complete project",
  "description": "Finish the React project setup",
  "priority": "high",
  "dueDate": "2024-04-15T18:00:00Z",
  "tags": ["work", "important"]
}
```

Response:
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "...",
    "title": "Complete project",
    "description": "Finish the React project setup",
    "status": "pending",
    "priority": "high",
    "dueDate": "2024-04-15T18:00:00.000Z",
    "user": { /* user object */ },
    "tags": ["work", "important"],
    "createdAt": "2024-04-06T10:30:00.000Z",
    "updatedAt": "2024-04-06T10:30:00.000Z"
  }
}
```

### Get All Tasks
**GET** `/api/tasks`

Query parameters (all optional):
- `page`: Page number (default: 1)
- `limit`: Items per page, max 50 (default: 10)
- `status`: Filter by status (pending, completed)
- `priority`: Filter by priority (low, medium, high)
- `sortBy`: Sort field (createdAt, dueDate, priority) (default: createdAt)
- `sortOrder`: Sort order (asc, desc) (default: desc)

Examples:
```
GET /api/tasks?page=1&limit=10
GET /api/tasks?status=pending&priority=high
GET /api/tasks?sortBy=dueDate&sortOrder=asc
GET /api/tasks?page=2&limit=5&status=completed
```

Response:
```json
{
  "success": true,
  "message": "Tasks retrieved",
  "data": {
    "tasks": [
      { /* task object */ },
      { /* task object */ }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 50,
      "itemsPerPage": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### Get Single Task
**GET** `/api/tasks/:id`

Response:
```json
{
  "success": true,
  "message": "Task retrieved",
  "data": { /* task object */ }
}
```

### Update Task
**PATCH** `/api/tasks/:id`

Request body (all optional):
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "completed",
  "priority": "low",
  "dueDate": "2024-04-20T18:00:00Z",
  "tags": ["updated", "tag"]
}
```

Response:
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": { /* updated task object */ }
}
```

### Mark Task as Completed
**PATCH** `/api/tasks/:id/complete`

Response:
```json
{
  "success": true,
  "message": "Task marked as completed",
  "data": { /* task object with status = "completed" */ }
}
```

### Delete Task
**DELETE** `/api/tasks/:id`

Response:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

### Get Task Statistics
**GET** `/api/tasks/stats`

Response:
```json
{
  "success": true,
  "message": "Task statistics retrieved",
  "data": {
    "total": 25,
    "completed": 10,
    "pending": 15,
    "byPriority": {
      "low": 8,
      "medium": 10,
      "high": 7
    }
  }
}
```

## 🏥 Health Check

**GET** `/api/health`

Response:
```json
{
  "status": "success",
  "message": "Server is healthy",
  "timestamp": "2024-04-06T10:30:00.000Z",
  "uptime": 123.45
}
```

**GET** `/api/health/live`

Response:
```json
{
  "status": "alive"
}
```

**GET** `/api/health/ready`

Response:
```json
{
  "status": "ready"
}
```

## 🔄 Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request (validation error)
- `401`: Unauthorized (authentication required)
- `404`: Not Found
- `409`: Conflict (duplicate resource)
- `500`: Internal Server Error

## 🔑 Environment Variables

```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://...
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

## 📊 Database Models

### User Model
- `_id`: MongoDB ObjectId
- `username`: String (unique, lowercase, 3-30 chars)
- `email`: String (unique, lowercase)
- `password`: String (hashed with bcrypt)
- `age`: Number (1-150)
- `year`: String (1st, 2nd, 3rd, 4th, 5th)
- `department`: String
- `createdAt`: Date
- `updatedAt`: Date

### Task Model
- `_id`: MongoDB ObjectId
- `title`: String (3-100 chars)
- `description`: String (max 500 chars)
- `status`: String (pending, completed)
- `priority`: String (low, medium, high)
- `dueDate`: Date (must be future date)
- `user`: ObjectId (ref to User)
- `tags`: Array of Strings
- `createdAt`: Date
- `updatedAt`: Date

## 🛡️ Security Features

- ✅ Password hashing with bcrypt (salt rounds: 10)
- ✅ JWT token authentication
- ✅ CORS protection
- ✅ Input validation with Zod
- ✅ MongoDB injection prevention via Mongoose
- ✅ XSS protection via JSON serialization
- ✅ Rate limiting ready (can be added)
- ✅ Error details hidden in production

## 🚀 Deployment

### Vercel
1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Environment Variables for Production
```
NODE_ENV=production
MONGO_URI=<production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
FRONTEND_URL=<production-frontend-url>
```

## 📝 API Testing

### Using cURL

Register:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"Password123"}'
```

Login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"Password123"}'
```

Create Task (with token):
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{"title":"My Task","priority":"high"}'
```

### Using Postman

1. Import the API endpoints
2. Set Authorization header: `Bearer <token>`
3. Test each endpoint

## 🧪 Example Workflow

1. Register user
   ```json
   POST /api/auth/register
   { "username": "john", "email": "john@example.com", "password": "Pass123" }
   ```

2. Get token from response

3. Create task
   ```json
   POST /api/tasks
   Authorization: Bearer <token>
   { "title": "Learn MERN", "priority": "high" }
   ```

4. Get all tasks
   ```
   GET /api/tasks?status=pending
   Authorization: Bearer <token>
   ```

5. Update task
   ```json
   PATCH /api/tasks/<task_id>
   Authorization: Bearer <token>
   { "status": "completed" }
   ```

6. Delete task
   ```
   DELETE /api/tasks/<task_id>
   Authorization: Bearer <token>
   ```

## 🐛 Common Issues

### "MONGO_URI is not set"
- Copy `.env.example` to `.env`
- Add your MongoDB Atlas connection string

### "Invalid token"
- Ensure token is included in Authorization header
- Format: `Authorization: Bearer <token>` (not "Token" or "JWT")
- Token might be expired (JWT_EXPIRE is 7 days by default)

### CORS Error
- Check FRONTEND_URL in .env matches your frontend URL
- Verify CORS origins in server.js

### Validation Error
- Check request body matches schema
- Ensure required fields are provided
- Verify data types (numbers, strings, arrays)

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variables
- **cors**: Cross-origin requests
- **morgan**: Request logging
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT authentication
- **zod**: Request validation

## 🔗 Related Files

- Frontend API client: `client/src/services/api.js`
- Frontend context: `client/src/context/TodoContext.jsx`
- Root README: `../README.md`
- Setup guide: `../SETUP.md`

---

**Production-ready backend with enterprise-grade security and error handling.** ✨
