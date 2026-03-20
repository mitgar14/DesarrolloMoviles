import { createContext, useContext, ReactNode } from "react";
import { useTasks, Task } from "../hooks/useTasks";

interface TasksContextType {
  tasks: Task[];
  addTask: (title: string, description: string) => void;
  updateTask: (id: string, data: Partial<Omit<Task, "id">>) => void;
  deleteTask: (id: string) => void;
  getTask: (id: string) => Task | undefined;
}

const TasksContext = createContext<TasksContextType>({} as TasksContextType);

export function TasksProvider({ children }: { children: ReactNode }) {
  const tasksValue = useTasks();

  return (
    <TasksContext.Provider value={tasksValue}>
      {children}
    </TasksContext.Provider>
  );
}

export const useTasksContext = () => useContext(TasksContext);
