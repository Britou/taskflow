import { createContext } from "react";

import type { Activity } from "../types/activity";

export type ActivityContextType = {
  activities: Activity[];
  loading: boolean;
  addActivity: (title: string) => Promise<void>;
};

export const ActivityContext = createContext<
  ActivityContextType | undefined
>(undefined);