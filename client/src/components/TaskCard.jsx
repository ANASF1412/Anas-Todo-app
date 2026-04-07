import { useState } from "react";

export const TaskCard = ({ task, onComplete, onEdit, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const priorityColors = {
    high: "text-red-400 bg-red-400/10",
    medium: "text-yellow-400 bg-yellow-400/10",
    low: "text-green-400 bg-green-400/10",
  };

  const statusColors = {
    completed: "text-green-400",
    pending: "text-yellow-400",
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status === "pending";

  return (
    <div
      className={`bg-slate-800 border rounded-lg p-6 hover:border-blue-500 transition-all duration-300 ${
        task.status === "completed"
          ? "border-slate-700 opacity-75"
          : "border-slate-700"
      } ${isOverdue ? "border-red-500/50" : ""}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              task.status === "completed"
                ? "text-gray-400 line-through"
                : "text-white"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{task.description}</p>
        </div>

        {/* Status Badge */}
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[task.status]} bg-opacity-20 ml-2 flex-shrink-0`}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </div>

      {/* Priority and Tags */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityColors[task.priority]}`}>
          {task.priority.toUpperCase()}
        </span>
        {task.tags && task.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-slate-700 text-blue-300"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Due Date */}
      <div className="mb-4">
        <p className={`text-sm ${isOverdue ? "text-red-400" : "text-gray-400"}`}>
          📅 {formatDate(task.dueDate)} {isOverdue && "⚠️ Overdue"}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-slate-700">
        {task.status === "pending" && (
          <button
            onClick={onComplete}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors text-sm"
          >
            ✓ Complete
          </button>
        )}
        <button
          onClick={onEdit}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors text-sm"
        >
          Delete
        </button>
      </div>

      {/* Delete Confirmation */}
      {showConfirm && (
        <div className="mt-4 p-3 bg-red-600/10 border border-red-600/50 rounded-lg">
          <p className="text-sm text-red-400 mb-3">
            Are you sure you want to delete this task?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded text-sm font-medium transition-colors"
            >
              Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded text-sm font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
