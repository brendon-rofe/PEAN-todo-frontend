import { useState } from "react";

type Props = { onAdd: (text: string) => Promise<void> | void };

export default function AddTask({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);

  const submit = async () => {
    const text = value.trim();
    if (!text) return;
    setPending(true);
    try {
      await onAdd(text);
      setValue(""); // clear on success
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 py-3">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Add a new task..."
        disabled={pending}
        className="flex-1 rounded-lg border border-[#333] bg-[#1E1E1E] text-white h-14 px-4 focus:border-[#4A90E2] focus:outline-none"
      />
      <button
        onClick={submit}
        disabled={pending || value.trim().length === 0}
        className="h-14 px-6 bg-[#4A90E2] text-white font-bold rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Adding…" : "Add"}
      </button>
    </div>
  );
}
