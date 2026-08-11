import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Activity } from "../types/activity";
import {
  createActivity,
  getActivities,
} from "../services/activityService";

type ActivityContextType = {
  activities: Activity[];
  loading: boolean;
  addActivity: (title: string) => Promise<void>;
};

const ActivityContext = createContext<ActivityContextType | undefined>(
  undefined
);

type ActivityProviderProps = {
  children: ReactNode;
};

export function ActivityProvider({
  children,
}: ActivityProviderProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const loadActivities = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getActivities();

      setActivities(data);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const addActivity = useCallback(
    async (title: string) => {
      try {
        await createActivity(title);

        await loadActivities();
      } catch (error) {
        console.error("Erro ao registrar atividade:", error);
      }
    },
    [loadActivities]
  );

  return (
    <ActivityContext.Provider
      value={{
        activities,
        loading,
        addActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivityContext() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "useActivityContext deve ser usado dentro de um ActivityProvider."
    );
  }

  return context;
}