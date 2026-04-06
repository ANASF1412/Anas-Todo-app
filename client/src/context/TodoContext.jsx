import { createContext, useState, useCallback } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/todos`);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTodo = useCallback(async (title, description = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/todos`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      setError(err.message);
      console.error("Error adding todo:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTodo = useCallback(async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/todos/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updates),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      return updatedTodo;
    } catch (err) {
      setError(err.message);
      console.error("Error updating todo:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTodo = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/todos/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting todo:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    todos,
    loading,
    error,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };

  return (
    <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
  );
};
