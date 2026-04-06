import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import healthRoutes from "./routes/health.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5000",
      "https://*.vercel.app",
      process.env.FRONTEND_URL || "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

// Request logging
app.use(morgan("dev"));

// MongoDB Connection
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(
      `✓ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`
    );
  } catch (error) {
    console.error(`✗ Error connecting to MongoDB: ${error.message}`);
    // Don't exit in production, allow graceful degradation
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  }
};

connectDB();

// Health Check Route
app.use("/api/health", healthRoutes);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tasks", taskRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Todo API Server is running",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      auth: "/api/auth/register, /api/auth/login",
      user: "/api/user/me, /api/user/update",
      tasks: "/api/tasks",
    },
  });
});

// 404 handler (must be before error handler)
app.use(notFoundHandler);

// Global error handling middleware (must be last)
app.use(errorHandler);

// Export app for Vercel
export default app;

// Local development server
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV !== "production" && process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ Environment: ${NODE_ENV}`);
    console.log("\nAPI Endpoints:");
    console.log("  POST   /api/auth/register");
    console.log("  POST   /api/auth/login");
    console.log("  GET    /api/user/me");
    console.log("  PATCH  /api/user/update");
    console.log("  POST   /api/tasks");
    console.log("  GET    /api/tasks");
    console.log("  GET    /api/tasks/:id");
    console.log("  PATCH  /api/tasks/:id");
    console.log("  DELETE /api/tasks/:id");
    console.log("  GET    /api/tasks/stats\n");
  });
}
