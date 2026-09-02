import { useContext } from "react";

import { TasksContext } from "../contexts/tasks-context";

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks deve ser usado dentro de um TasksProvider.");
  }

  return context;
}