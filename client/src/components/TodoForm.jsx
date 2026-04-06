import { useContext, useState } from "react";
import { TodoContext } from "../context/TodoContext";

export default function TodoForm() {
  const { addTodo, loading } = useContext(TodoContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      await addTodo(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    } catch (err) {
      setError(err.message || "Failed to add todo");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Todo</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="input-field"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details (optional)"
            rows="3"
            className="input-field resize-none"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed ${
            loading ? "opacity-50" : ""
          }`}
        >
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </div>
    </form>
  );
}
