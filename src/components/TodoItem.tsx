import type { Todo } from "../types/Todo";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <label className="flex items-center gap-4 p-4 rounded-lg bg-[#1E1E1E]">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="h-6 w-6 rounded border-2 border-[#444] text-[#4A90E2] focus:ring-0"
      />
      <p
        className={`flex-1 text-base ${
          todo.done ? "line-through text-gray-500" : "text-white"
        }`}
      >
        {todo.text}
      </p>
      <button onClick={() => onDelete(todo.id)} className="text-gray-500 hover:text-white">
        <span className="material-symbols-outlined">delete</span>
      </button>
    </label>
  );
}
