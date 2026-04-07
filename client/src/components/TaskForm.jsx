import { useState } from "react";

export const TaskForm = ({ initialTask, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialTask?.title || "",
    description: initialTask?.description || "",
    priority: initialTask?.priority || "medium",
    dueDate: initialTask?.dueDate
      ? new Date(initialTask.dueDate).toISOString().split("T")[0]
      : "",
    tags: initialTask?.tags?.join(", ") || "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must not exceed 100 characters";
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = "Description must not exceed 500 characters";
    }

    if (formData.dueDate && new Date(formData.dueDate) < new Date()) {
      newErrors.dueDate = "Due date must be in the future";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };
      await onSubmit(submitData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          maxLength={100}
          className={`w-full px-4 py-2 rounded-lg bg-slate-700 border ${
            errors.title ? "border-red-400" : "border-slate-600"
          } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.title && (
            <p className="text-red-400 text-sm">{errors.title}</p>
          )}
          <span className="text-gray-400 text-xs ml-auto">
            {formData.title.length}/100
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description (optional)"
          maxLength={500}
          rows={4}
          className={`w-full px-4 py-2 rounded-lg bg-slate-700 border ${
            errors.description ? "border-red-400" : "border-slate-600"
          } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none`}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.description && (
            <p className="text-red-400 text-sm">{errors.description}</p>
          )}
          <span className="text-gray-400 text-xs ml-auto">
            {formData.description.length}/500
          </span>
        </div>
      </div>

      {/* Priority and Due Date */}
      <div className="grid grid-cols-2 gap-4">
        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg bg-slate-700 border ${
              errors.dueDate ? "border-red-400" : "border-slate-600"
            } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          />
          {errors.dueDate && (
            <p className="text-red-400 text-sm mt-1">{errors.dueDate}</p>
          )}
        </div>
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="e.g. work, urgent, personal"
          className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <p className="text-gray-400 text-xs mt-1">
          Separate multiple tags with commas
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save Task"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
