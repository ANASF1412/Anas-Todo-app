import { sendError } from "../utils/response.js";

// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error("Error:", {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    path: req.path,
    method: req.method,
  });

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return sendError(res, "Validation failed", 400, { errors: messages });
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    return sendError(res, "Invalid ID format", 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return sendError(res, `${field} already exists`, 409);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return sendError(res, "Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    return sendError(res, "Token has expired", 401);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return sendError(res, message, statusCode);
};

// 404 handler
export const notFoundHandler = (req, res) => {
  return sendError(res, `Route ${req.path} not found`, 404);
};
