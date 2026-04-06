import { useContext, useEffect, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import Header from "../components/Header";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

export default function Home() {
  const { todos, loading, error, fetchTodos } = useContext(TodoContext);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos =
    filter === "completed"
      ? todos.filter((todo) => todo.completed)
      : filter === "pending"
        ? todos.filter((todo) => !todo.completed)
        : todos;

  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="min-h-screen py-12 px-4">
      <Header />

      <main className="max-w-2xl mx-auto">
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Error: {error}
          </div>
        )}

        <div className="card mb-8">
          <TodoForm />
        </div>

        <div className="card mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Statistics
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Total</p>
              <p className="text-3xl font-bold text-blue-600">{todos.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-600">
                {completedCount}
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-3xl font-bold text-orange-600">
                {todos.length - completedCount}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "pending"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === "completed"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Completed
            </button>
          </div>

          {loading && (
            <div className="py-8 text-center">
              <p className="text-gray-600">Loading todos...</p>
            </div>
          )}

          {!loading && filteredTodos.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-gray-500 text-lg">
                {filter === "all"
                  ? "No todos yet. Create one to get started!"
                  : `No ${filter} todos.`}
              </p>
            </div>
          )}

          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
