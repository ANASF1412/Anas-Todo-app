export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-800 border border-slate-700 rounded-lg">
      <div className="text-6xl mb-4">📭</div>
      <h3 className="text-2xl font-bold text-white mb-2">No tasks yet</h3>
      <p className="text-gray-400 text-center max-w-md">
        Create your first task by clicking the "New Task" button above, or adjust your filters to see different tasks.
      </p>
    </div>
  );
};
