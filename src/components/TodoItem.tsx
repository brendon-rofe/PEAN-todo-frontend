import { useEffect, useRef, useState } from "react";
import type { Todo } from "../types/Todo";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, nextText: string) => Promise<void> | void;
};

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState(todo.description);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setValue(todo.description);
      inputRef.current?.focus();
    }
  }, [editing, todo.description]);

  const submit = async () => {
    const trimmed = value.trim();
    if (!trimmed || trimmed === todo.description) {
      setEditing(false);
      return;
    }
    setPending(true);
    setError(null);
    try {
      await onEdit(todo.id, trimmed); // calls App -> API
      setEditing(false);
    } catch {
      setError("Update failed. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const cancel = () => {
    setEditing(false);
    setError(null);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-x-4 p-4 rounded-lg bg-[#1E1E1E]">
        {/* checkbox */}
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          className="h-6 w-6 rounded border-2 border-[#444] bg-[#1E1E1E] checked:bg-[#4A90E2] checked:border-[#4A90E2] focus:ring-0 appearance-none cursor-pointer"
          style={{
            backgroundImage: todo.done
              ? "url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")"
              : "none",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "75%",
          }}
        />

        {/* description */}
        <p
          className={`text-base flex-1 ${todo.done ? "line-through text-gray-500" : "text-white"}`}
        >
          {todo.description}
        </p>

        {/* actions */}
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => setEditing((v) => !v)}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer"
            title="Edit"
            aria-label="Edit"
          >
            <PencilSquareIcon className="h-6 w-6" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            title="Delete"
            aria-label="Delete"
          >
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      </label>

      {/* inline edit form (only when editing) */}
      {editing && (
        <form
          onSubmit={(e) => { e.preventDefault(); submit(); }}
          className="flex items-center gap-2 px-4"
        >
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Escape") { e.preventDefault(); cancel(); } }}
            disabled={pending}
            placeholder="Update task..."
            className="flex-1 rounded-md border border-[#333] bg-[#1E1E1E] text-white h-10 px-3 text-sm focus:border-[#4A90E2] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={pending}
            className="h-10 px-4 rounded-md bg-[#4A90E2] text-white text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {pending ? "Saving…" : "Update"}
          </button>
          <button
            type="button"
            onClick={cancel}
            disabled={pending}
            className="h-10 px-3 rounded-md border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white text-sm font-medium disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          {error && <span className="text-red-400 text-xs">{error}</span>}
        </form>
  )}
    </div>
  );
};
