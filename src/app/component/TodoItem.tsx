"use client";

export default function TodoItem({
  task,
  onToggle,
  onDelete,
}: {
  task: { id: string; text: string; done: boolean };
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 p-2 border rounded">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        className="h-5 w-5"
      />
      <span className={`flex-1 ${task.done ? "line-through" : ""}`}>
        {task.text}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
}
