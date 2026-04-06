import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters long"],
      maxlength: [100, "Title must not exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description must not exceed 500 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "completed"],
        message: "Status must be either 'pending' or 'completed'",
      },
      default: "pending",
    },
    priority: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "Priority must be 'low', 'medium', or 'high'",
      },
      default: "medium",
    },
    dueDate: {
      type: Date,
      validate: {
        validator: function (value) {
          if (!value) return true; // Optional field
          return value >= new Date();
        },
        message: "Due date must be in the future",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    tags: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          return value.every((tag) => typeof tag === "string" && tag.trim().length > 0);
        },
        message: "All tags must be non-empty strings",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
taskSchema.index({ user: 1, createdAt: -1 });
taskSchema.index({ user: 1, status: 1 });
taskSchema.index({ user: 1, priority: 1 });

export default mongoose.model("Task", taskSchema);
