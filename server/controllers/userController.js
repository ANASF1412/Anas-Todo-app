import User from "../models/User.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { asyncHandler } from "../middleware/validation.js";

// Get current user profile
export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId);

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  return sendSuccess(res, "User profile retrieved", user.toJSON());
});

// Update user profile
export const updateUser = asyncHandler(async (req, res) => {
  const { username, age, year, department } = req.body;
  const userId = req.userId;

  // Check if new username is already taken (if being updated)
  if (username) {
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
      _id: { $ne: userId },
    });

    if (existingUser) {
      return sendError(res, "Username already taken", 409);
    }
  }

  // Build update object
  const updateData = {};
  if (username) updateData.username = username;
  if (age !== undefined) updateData.age = age;
  if (year) updateData.year = year;
  if (department !== undefined) updateData.department = department;

  const user = await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  return sendSuccess(
    res,
    "User updated successfully",
    user.toJSON()
  );
});

// Get user by ID (admin only or own profile)
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  return sendSuccess(res, "User retrieved", user.toJSON());
});

// Delete user account
export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return sendError(res, "User not found", 404);
  }

  return sendSuccess(res, "User account deleted successfully");
});
