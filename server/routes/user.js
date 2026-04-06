import express from "express";
import {
  getCurrentUser,
  updateUser,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";
import { authenticate } from "../middleware/auth.js";
import { validateRequest, asyncHandler } from "../middleware/validation.js";
import { updateUserSchema } from "../validators/schemas.js";

const router = express.Router();

// All user routes are protected
router.use(authenticate);

// GET /api/user/me
router.get("/me", asyncHandler(getCurrentUser));

// PATCH /api/user/update
router.patch(
  "/update",
  validateRequest(updateUserSchema),
  asyncHandler(updateUser)
);

// GET /api/user/:id
router.get("/:id", asyncHandler(getUserById));

// DELETE /api/user
router.delete("/", asyncHandler(deleteUser));

export default router;
