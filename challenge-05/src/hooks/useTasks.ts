import { useState } from "react";

export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      done: false,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, data: Partial<Omit<Task, "id">>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const getTask = (id: string) => tasks.find((t) => t.id === id);

  return { tasks, addTask, updateTask, deleteTask, getTask };
}
