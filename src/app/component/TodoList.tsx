"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

interface Task {
  id: string;
  text: string;
  done: boolean;
}

export default function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Fetch tasks on load
  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await supabase.from("todos").select("*");
      setTasks(data || []);
    };
    fetchTasks();

    // Real-time updates
    const channel = supabase
      .channel("todos")
      .on("postgres_changes", { event: "*", schema: "public" }, () =>
        fetchTasks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Add task
  const addTask = async (text: string) => {
    const { data } = await supabase.from("todos").insert([{ text }]).select();
    if (data) setTasks([...tasks, data[0]]);
  };

  // Toggle task
  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    const { data } = await supabase
      .from("todos")
      .update({ done: !task?.done })
      .eq("id", id)
      .select();
    if (data) {
      setTasks(tasks.map((t) => (t.id === id ? data[0] : t)));
    }
  };

  // Delete task
  const deleteTask = async (id: string) => {
    await supabase.from("todos").delete().eq("id", id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-4">
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
        <button
          onClick={() => {
            supabase.from("todos").select("*").then(console.log);
          }}
        >
          Test Supabase
        </button>
        ;
      </div>
    </div>
  );
}
