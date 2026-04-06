import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats,
  completeTask,
} from "../controllers/taskController.js";
import { authenticate } from "../middleware/auth.js";
import { validateRequest, asyncHandler } from "../middleware/validation.js";
import {
  createTaskSchema,
  updateTaskSchema,
  getTasksQuerySchema,
} from "../validators/schemas.js";

const router = express.Router();

// All task routes are protected
router.use(authenticate);

// GET /api/tasks/stats
router.get("/stats", asyncHandler(getTaskStats));

// POST /api/tasks
router.post(
  "/",
  validateRequest(createTaskSchema),
  asyncHandler(createTask)
);

// GET /api/tasks
router.get(
  "/",
  validateRequest(getTasksQuerySchema),
  asyncHandler(getTasks)
);

// GET /api/tasks/:id
router.get("/:id", asyncHandler(getTask));

// PATCH /api/tasks/:id
router.patch(
  "/:id",
  validateRequest(updateTaskSchema),
  asyncHandler(updateTask)
);

// PATCH /api/tasks/:id/complete
router.patch("/:id/complete", asyncHandler(completeTask));

// DELETE /api/tasks/:id
router.delete("/:id", asyncHandler(deleteTask));

export default router;
