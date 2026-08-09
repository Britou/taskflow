import { createContext, useCallback, useContext, useEffect, useState, type ReactNode, } from "react";

import { getTasks } from "../services/taskService";
import type { Task } from "../types/task";

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  reload: () => Promise<void>;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

type TasksProviderProps = {
  children: ReactNode;
};

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getTasks();

      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        reload: loadTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error(
      "useTasksContext deve ser usado dentro de um TasksProvider."
    );
  }

  return context;
}