import { useCallback, useEffect, useState } from "react";

import type { ReactNode } from "react";
import { getTasks } from "../services/taskService";
import type { Task } from "../types/task";
import { TasksContext } from "./tasksContext";

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
    void Promise.resolve().then(loadTasks);
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