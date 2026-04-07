export const TaskFilters = ({ filters, setFilters }) => {
  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handlePriorityChange = (priority) => {
    setFilters((prev) => ({ ...prev, priority }));
  };

  const handleSortChange = (sortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">
            Status
          </label>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Tasks" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={filters.status === option.value}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-600"
                />
                <span className="text-sm text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">
            Priority
          </label>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Priorities" },
              { value: "low", label: "Low" },
              { value: "medium", label: "Medium" },
              { value: "high", label: "High" },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value={option.value}
                  checked={filters.priority === option.value}
                  onChange={(e) => handlePriorityChange(e.target.value)}
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-600"
                />
                <span className="text-sm text-gray-300">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-3">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="createdAt">Created Date</option>
            <option value="title">Title (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
