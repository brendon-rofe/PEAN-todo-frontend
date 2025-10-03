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
        className={`
          h-6 w-6 rounded
          border-2 border-[#444]
          bg-[#1E1E1E]
          checked:bg-[#4A90E2] 
          checked:border-[#4A90E2]
          focus:ring-0 focus:ring-offset-0
          appearance-none 
          cursor-pointer
          relative
        `}
        style={{
          backgroundImage: todo.done
            ? "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")"
            : "none",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "75%",
        }}
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
