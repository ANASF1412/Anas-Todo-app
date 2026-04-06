import { z } from "zod";

// Auth Validators
export const registerSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must not exceed 30 characters")
      .regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, underscores, and hyphens"),
    email: z
      .string()
      .email("Please provide a valid email")
      .toLowerCase(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit"),
    age: z.number().min(1).max(150).optional(),
    year: z.enum(["1st", "2nd", "3rd", "4th", "5th"]).optional(),
    department: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Please provide a valid email")
      .toLowerCase(),
    password: z
      .string()
      .min(1, "Password is required"),
  }),
});

// User Validators
export const updateUserSchema = z.object({
  body: z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must not exceed 30 characters")
      .regex(/^[a-z0-9_-]+$/, "Username can only contain lowercase letters, numbers, underscores, and hyphens")
      .optional(),
    age: z.number().min(1).max(150).optional(),
    year: z.enum(["1st", "2nd", "3rd", "4th", "5th"]).optional(),
    department: z.string().optional(),
  }),
});

// Task Validators
export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must not exceed 100 characters"),
    description: z
      .string()
      .max(500, "Description must not exceed 500 characters")
      .optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z
      .string()
      .datetime()
      .optional()
      .refine(
        (date) => {
          if (!date) return true;
          return new Date(date) >= new Date();
        },
        "Due date must be in the future"
      ),
    tags: z.array(z.string().min(1)).optional(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title must not exceed 100 characters")
      .optional(),
    description: z
      .string()
      .max(500, "Description must not exceed 500 characters")
      .optional(),
    status: z.enum(["pending", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    dueDate: z
      .string()
      .datetime()
      .optional()
      .refine(
        (date) => {
          if (!date) return true;
          return new Date(date) >= new Date();
        },
        "Due date must be in the future"
      ),
    tags: z.array(z.string().min(1)).optional(),
  }),
});

// Query Validators
export const getTasksQuerySchema = z.object({
  query: z.object({
    page: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0, "Page must be greater than 0")
      .optional()
      .default("1"),
    limit: z
      .string()
      .transform((val) => parseInt(val, 10))
      .refine((val) => val > 0 && val <= 50, "Limit must be between 1 and 50")
      .optional()
      .default("10"),
    status: z.enum(["pending", "completed"]).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    sortBy: z.enum(["createdAt", "dueDate", "priority"]).optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
  }),
});
