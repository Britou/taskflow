import { useTasksContext } from "../contexts/TasksContext";

export function useTasks() {
  return useTasksContext();
}