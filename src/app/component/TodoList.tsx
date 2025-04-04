"use client";
import { useState } from "react";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const [tasks, setTasks] = useState<
    { id: string; text: string; done: boolean }[]
  >([]);

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now().toString(), text, done: false }]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>
      <AddTodo onAdd={addTask} />
      <div className="space-y-2">
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}
