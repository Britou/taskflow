import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import type { ReactNode } from "react";
import { getTasks } from "../services/taskService";
import type { Task } from "../types/task";
import { TasksContext } from "./tasks-context";

type TasksProviderProps = {
  children: ReactNode;
};

export function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadTasks = useCallback(async () => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getTasks(user.uid);

      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

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