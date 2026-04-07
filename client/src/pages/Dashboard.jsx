import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "../components/TaskCard";
import { TaskForm } from "../components/TaskForm";
import { Modal } from "../components/Modal";
import { TaskFilters } from "../components/TaskFilters";
import { EmptyState } from "../components/EmptyState";
import { LoadingSkeleton } from "../components/LoadingSkeleton";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { addToast } = useToast();
  const {
    tasks,
    stats,
    loading,
    fetchTasks,
    fetchStats,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
  } = useTasks();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    sortBy: "dueDate",
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Initial load
  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  // Refetch when filters change
  useEffect(() => {
    const params = {};
    if (filters.status !== "all") params.status = filters.status;
    if (filters.priority !== "all") params.priority = filters.priority;
    params.sortBy = filters.sortBy;
    fetchTasks(params);
  }, [filters]);

  const handleCreateTask = async (taskData) => {
    await createTask(taskData);
    setShowCreateModal(false);
    addToast("Task created successfully!", "success");
  };

  const handleUpdateTask = async (taskData) => {
    await updateTask(editingTask._id, taskData);
    setShowEditModal(false);
    setEditingTask(null);
    addToast("Task updated successfully!", "success");
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    addToast("Task deleted successfully!", "success");
  };

  const handleCompleteTask = async (taskId) => {
    await completeTask(taskId);
    addToast("Task completed!", "success");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredTasks = tasks.filter(task => {
    if (filters.status !== "all" && task.status !== filters.status) return false;
    if (filters.priority !== "all" && task.priority !== filters.priority) return false;
    return true;
  });

  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col`}
      >
        {/* Logo/Brand */}
        <div className="p-6 border-b border-slate-700">
          <h2 className={`font-bold text-white ${sidebarOpen ? "text-2xl" : "text-center text-lg"}`}>
            {sidebarOpen ? "✓ Tasks" : "✓"}
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <NavItem
            icon="📊"
            label="Dashboard"
            sidebarOpen={sidebarOpen}
            active
          />
          <NavItem icon="📋" label="My Tasks" sidebarOpen={sidebarOpen} />
          <NavItem icon="⭐" label="Favorites" sidebarOpen={sidebarOpen} />
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-700">
          <div
            className={`bg-slate-700 rounded-lg p-3 ${
              sidebarOpen ? "" : "flex justify-center"
            }`}
          >
            <div className={sidebarOpen ? "text-sm" : "text-center text-xs"}>
              <p className="font-semibold text-white truncate">
                {user?.username || "User"}
              </p>
              {sidebarOpen && (
                <p className="text-gray-400 text-xs truncate">{user?.email}</p>
              )}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            {sidebarOpen ? "Logout" : "🚪"}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full p-4 text-gray-400 hover:text-white transition-colors border-t border-slate-700"
        >
          {sidebarOpen ? "←" : "→"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-slate-800 border-b border-slate-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, {user?.username}!</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              + New Task
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard
              label="Total Tasks"
              value={stats?.total || 0}
              icon="📝"
              color="bg-blue-500"
            />
            <StatCard
              label="Completed"
              value={stats?.completed || 0}
              icon="✅"
              color="bg-green-500"
            />
            <StatCard
              label="Pending"
              value={stats?.pending || 0}
              icon="⏳"
              color="bg-yellow-500"
            />
            <StatCard
              label="High Priority"
              value={stats?.highPriority || 0}
              icon="🔴"
              color="bg-red-500"
            />
          </div>

          {/* Filters */}
          <TaskFilters filters={filters} setFilters={setFilters} />

          {/* Tasks List */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Your Tasks</h2>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <LoadingSkeleton key={i} />
                ))}
              </div>
            ) : filteredTasks.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onComplete={() => handleCompleteTask(task._id)}
                    onEdit={() => {
                      setEditingTask(task);
                      setShowEditModal(true);
                    }}
                    onDelete={() => handleDeleteTask(task._id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Task"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      {/* Edit Task Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingTask(null);
        }}
        title="Edit Task"
      >
        {editingTask && (
          <TaskForm
            initialTask={editingTask}
            onSubmit={handleUpdateTask}
            onCancel={() => {
              setShowEditModal(false);
              setEditingTask(null);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

const NavItem = ({ icon, label, sidebarOpen, active }) => (
  <button
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? "bg-blue-600 text-white"
        : "text-gray-400 hover:text-white hover:bg-slate-700"
    }`}
  >
    <span className="text-xl">{icon}</span>
    {sidebarOpen && <span className="font-medium">{label}</span>}
  </button>
);

const StatCard = ({ label, value, icon, color }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <p className="text-4xl font-bold text-white mt-2">{value}</p>
      </div>
      <div className={`${color} text-white text-3xl p-4 rounded-lg opacity-20`}>
        {icon}
      </div>
    </div>
  </div>
);
