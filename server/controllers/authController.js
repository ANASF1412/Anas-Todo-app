import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { sendSuccess, sendError } from "../utils/response.js";
import { asyncHandler } from "../middleware/validation.js";

// Register user
export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, age, year, department } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExists) {
    return sendError(
      res,
      userExists.email === email
        ? "Email already registered"
        : "Username already taken",
      409
    );
  }

  // Create new user
  const user = new User({
    username,
    email,
    password,
    age,
    year,
    department,
  });

  await user.save();

  // Generate token
  const token = generateToken(user._id);

  // Return response
  return sendSuccess(
    res,
    "User registered successfully",
    {
      user: user.toJSON(),
      token,
    },
    201
  );
});

// Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and select password field
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return sendError(res, "Invalid email or password", 401);
  }

  // Compare password
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return sendError(res, "Invalid email or password", 401);
  }

  // Generate token
  const token = generateToken(user._id);

  // Return response
  return sendSuccess(res, "Login successful", {
    user: user.toJSON(),
    token,
  });
});

// Logout user (client-side is responsible for removing token)
export const logoutUser = asyncHandler(async (req, res) => {
  return sendSuccess(res, "Logout successful");
});
