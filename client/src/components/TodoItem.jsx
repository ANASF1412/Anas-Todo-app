import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export default function TodoItem({ todo }) {
  const { updateTodo, deleteTodo } = useContext(TodoContext);

  const handleToggle = () => {
    updateTodo(todo._id, { completed: !todo.completed });
  };

  const handleDelete = () => {
    deleteTodo(todo._id);
  };

  return (
    <div className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed || false}
        onChange={handleToggle}
        className="mt-1 w-5 h-5 rounded border-gray-300 cursor-pointer"
      />

      <div className="flex-1">
        <h3
          className={`font-semibold text-lg ${
            todo.completed ? "line-through text-gray-400" : "text-gray-800"
          }`}
        >
          {todo.title}
        </h3>
        {todo.description && (
          <p className="text-gray-600 mt-1">{todo.description}</p>
        )}
        {todo.dueDate && (
          <p className="text-sm text-gray-500 mt-2">
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>

      <button
        onClick={handleDelete}
        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </div>
  );
}
