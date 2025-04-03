"use client"; // Required for hooks
import { useState } from "react";

export default function TodoList() {
  // State to hold tasks
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
      setNewTask(""); // Clear input
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Inside your TodoList component
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kamal's Todo List</h1>

      {/* Input field */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-2 p-2 border rounded"
          >
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => toggleTask(task.id)} // Connect to toggle
              className="h-5 w-5"
            />
            <span
              className={`flex-1 ${
                task.done ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
