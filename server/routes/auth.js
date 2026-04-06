import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";
import { validateRequest, asyncHandler } from "../middleware/validation.js";
import { registerSchema, loginSchema } from "../validators/schemas.js";

const router = express.Router();

// POST /api/auth/register
router.post(
  "/register",
  validateRequest(registerSchema),
  asyncHandler(registerUser)
);

// POST /api/auth/login
router.post(
  "/login",
  validateRequest(loginSchema),
  asyncHandler(loginUser)
);

// POST /api/auth/logout
router.post("/logout", asyncHandler(logoutUser));

export default router;
