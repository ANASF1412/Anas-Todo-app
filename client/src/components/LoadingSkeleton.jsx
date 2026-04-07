export const LoadingSkeleton = () => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-6 bg-slate-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-700 rounded w-full"></div>
        </div>
        <div className="h-6 bg-slate-700 rounded w-20 ml-4 flex-shrink-0"></div>
      </div>

      {/* Tags skeleton */}
      <div className="flex items-center gap-2 mb-4">
        <div className="h-5 bg-slate-700 rounded w-16"></div>
        <div className="h-5 bg-slate-700 rounded w-20"></div>
      </div>

      {/* Date skeleton */}
      <div className="h-4 bg-slate-700 rounded w-32 mb-4"></div>

      {/* Actions skeleton */}
      <div className="flex gap-2 pt-4 border-t border-slate-700">
        <div className="flex-1 h-10 bg-slate-700 rounded"></div>
        <div className="flex-1 h-10 bg-slate-700 rounded"></div>
        <div className="flex-1 h-10 bg-slate-700 rounded"></div>
      </div>
    </div>
  );
};
