import { createContext } from "react";

import type { Task } from "../types/task";

export type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  reload: () => Promise<void>;
};

export const TasksContext = createContext<TasksContextType | undefined>(
  undefined
);