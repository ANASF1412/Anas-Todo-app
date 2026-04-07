import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if token expired
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authAPI = {
  register: (data) => apiClient.post("/auth/register", data),
  login: (data) => apiClient.post("/auth/login", data),
  logout: () => apiClient.post("/auth/logout"),
};

// User Endpoints
export const userAPI = {
  getMe: () => apiClient.get("/user/me"),
  updateProfile: (data) => apiClient.patch("/user/update", data),
  getUserById: (id) => apiClient.get(`/user/${id}`),
  deleteAccount: () => apiClient.delete("/user"),
};

// Task Endpoints
export const taskAPI = {
  createTask: (data) => apiClient.post("/tasks", data),
  getTasks: (params = {}) => apiClient.get("/tasks", { params }),
  getTask: (id) => apiClient.get(`/tasks/${id}`),
  updateTask: (id, data) => apiClient.patch(`/tasks/${id}`, data),
  deleteTask: (id) => apiClient.delete(`/tasks/${id}`),
  completeTask: (id) => apiClient.patch(`/tasks/${id}/complete`),
  getStats: () => apiClient.get("/tasks/stats"),
};

// Health Check
export const healthAPI = {
  check: () => apiClient.get("/health"),
};

export default apiClient;
