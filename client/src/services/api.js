import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Health check
export const checkHealth = async () => {
  try {
    const response = await apiClient.get("/api/health");
    return response.data;
  } catch (error) {
    console.error("Health check failed:", error);
    throw error;
  }
};

// Todos endpoints
export const getTodos = async () => {
  const response = await apiClient.get("/api/todos");
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await apiClient.post("/api/todos", todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await apiClient.put(`/api/todos/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await apiClient.delete(`/api/todos/${id}`);
  return response.data;
};

export default apiClient;
