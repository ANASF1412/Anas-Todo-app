import Task from "../models/Task.js";
import { sendSuccess, sendError, getPagination, getPaginationMetadata } from "../utils/response.js";
import { asyncHandler } from "../middleware/validation.js";

// Create task
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, priority, dueDate, tags } = req.body;
  const userId = req.userId;

  const task = new Task({
    title,
    description: description || "",
    priority: priority || "medium",
    dueDate,
    user: userId,
    tags: tags || [],
  });

  await task.save();
  await task.populate("user", "username email");

  return sendSuccess(res, "Task created successfully", task, 201);
});

// Get all tasks with pagination, filtering, and sorting
export const getTasks = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const { page = 1, limit = 10, status, priority, sortBy = "createdAt", sortOrder = "desc" } = req.query;

  // Get pagination values
  const { skip, limit: finalLimit, page: finalPage } = getPagination(page, limit);

  // Build filter
  const filter = { user: userId };
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  // Build sort
  const sort = {};
  if (sortBy === "createdAt" || sortBy === "dueDate" || sortBy === "priority") {
    sort[sortBy] = sortOrder === "asc" ? 1 : -1;
  } else {
    sort.createdAt = -1;
  }

  // Get total count for pagination
  const total = await Task.countDocuments(filter);

  // Get tasks
  const tasks = await Task.find(filter)
    .populate("user", "username email")
    .sort(sort)
    .skip(skip)
    .limit(finalLimit);

  const pagination = getPaginationMetadata(finalPage, finalLimit, total);

  return sendSuccess(res, "Tasks retrieved", {
    tasks,
    pagination,
  });
});

// Get single task
export const getTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const task = await Task.findOne({
    _id: id,
    user: userId,
  }).populate("user", "username email");

  if (!task) {
    return sendError(res, "Task not found", 404);
  }

  return sendSuccess(res, "Task retrieved", task);
});

// Update task
export const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  const { title, description, status, priority, dueDate, tags } = req.body;

  // Check if task exists and belongs to user
  let task = await Task.findOne({
    _id: id,
    user: userId,
  });

  if (!task) {
    return sendError(res, "Task not found", 404);
  }

  // Update fields
  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;
  if (priority !== undefined) task.priority = priority;
  if (dueDate !== undefined) task.dueDate = dueDate;
  if (tags !== undefined) task.tags = tags;

  await task.save();
  await task.populate("user", "username email");

  return sendSuccess(res, "Task updated successfully", task);
});

// Delete task
export const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const task = await Task.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!task) {
    return sendError(res, "Task not found", 404);
  }

  return sendSuccess(res, "Task deleted successfully");
});

// Get task statistics
export const getTaskStats = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const total = await Task.countDocuments({ user: userId });
  const completed = await Task.countDocuments({ user: userId, status: "completed" });
  const pending = await Task.countDocuments({ user: userId, status: "pending" });

  const byPriority = await Task.aggregate([
    { $match: { user: userId } },
    { $group: { _id: "$priority", count: { $sum: 1 } } },
  ]);

  const stats = {
    total,
    completed,
    pending,
    byPriority: byPriority.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {}),
  };

  return sendSuccess(res, "Task statistics retrieved", stats);
});

// Mark task as completed
export const completeTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  const task = await Task.findOneAndUpdate(
    { _id: id, user: userId },
    { status: "completed" },
    { new: true, runValidators: true }
  ).populate("user", "username email");

  if (!task) {
    return sendError(res, "Task not found", 404);
  }

  return sendSuccess(res, "Task marked as completed", task);
});
