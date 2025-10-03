import { useState } from "react";

export default function AddTask({ onAdd }: { onAdd: (text: string) => void }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim()) {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 py-3">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 rounded-lg border border-[#333] bg-[#1E1E1E] text-white h-14 px-4 focus:border-[#4A90E2] focus:outline-none"
      />
      <button
        onClick={handleSubmit}
        className="h-14 px-6 bg-[#4A90E2] text-white font-bold rounded-lg cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}
