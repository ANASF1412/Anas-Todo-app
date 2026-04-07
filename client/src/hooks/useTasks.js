import { useState, useCallback } from "react";
import { taskAPI } from "../services/api";
import { useToast } from "./useToast";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const { addToast } = useToast();

  const fetchTasks = useCallback(
    async (params = {}) => {
      setLoading(true);
      try {
        const response = await taskAPI.getTasks(params);
        setTasks(response.data.tasks || []);
        return response.data;
      } catch (error) {
        addToast(
          error.response?.data?.message || "Failed to fetch tasks",
          "error"
        );
        return { tasks: [] };
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  const fetchStats = useCallback(async () => {
    try {
      const response = await taskAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }, []);

  const createTask = useCallback(
    async (taskData) => {
      setLoading(true);
      try {
        const response = await taskAPI.createTask(taskData);
        addToast("Task created successfully", "success");
        await fetchTasks();
        return response.data;
      } catch (error) {
        addToast(
          error.response?.data?.message || "Failed to create task",
          "error"
        );
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addToast, fetchTasks]
  );

  const updateTask = useCallback(
    async (id, taskData) => {
      setLoading(true);
      try {
        const response = await taskAPI.updateTask(id, taskData);
        addToast("Task updated successfully", "success");
        await fetchTasks();
        return response.data;
      } catch (error) {
        addToast(
          error.response?.data?.message || "Failed to update task",
          "error"
        );
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addToast, fetchTasks]
  );

  const deleteTask = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await taskAPI.deleteTask(id);
        addToast("Task deleted successfully", "success");
        await fetchTasks();
      } catch (error) {
        addToast(
          error.response?.data?.message || "Failed to delete task",
          "error"
        );
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addToast, fetchTasks]
  );

  const completeTask = useCallback(
    async (id) => {
      try {
        const response = await taskAPI.completeTask(id);
        addToast("Task completed!", "success");
        await fetchTasks();
        return response.data;
      } catch (error) {
        addToast(
          error.response?.data?.message || "Failed to complete task",
          "error"
        );
        throw error;
      }
    },
    [addToast, fetchTasks]
  );

  return {
    tasks,
    stats,
    loading,
    fetchTasks,
    fetchStats,
    createTask,
    updateTask,
    deleteTask,
    completeTask,
  };
};
