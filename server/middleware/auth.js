import { sendError } from "../utils/response.js";
import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";

// Protect routes - verify JWT token
export const authenticate = async (req, res, next) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) {
      return sendError(res, "No token provided. Please login.", 401);
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.id);

    if (!user) {
      return sendError(res, "User not found", 404);
    }

    // Attach user to request
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    if (error.message === "Token has expired") {
      return sendError(res, "Token has expired. Please login again.", 401);
    }
    if (error.message === "Invalid token") {
      return sendError(res, "Invalid token. Please login again.", 401);
    }
    return sendError(res, error.message || "Authentication failed", 401);
  }
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);
      if (user) {
        req.user = user;
        req.userId = user._id;
      }
    }

    next();
  } catch (error) {
    // Silently fail for optional auth
    next();
  }
};
