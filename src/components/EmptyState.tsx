export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-6 px-4 py-12 text-center">
      <svg
        className="w-32 h-32 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </svg>
      <div>
        <p className="text-lg font-bold">You're all caught up!</p>
        <p className="text-gray-400 text-sm">Add a new task to get started.</p>
      </div>
    </div>
  );
}
