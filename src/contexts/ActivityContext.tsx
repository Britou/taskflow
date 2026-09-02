import { useCallback, useEffect, useState } from "react";

import type { ReactNode } from "react";
import {
  createActivity,
  getActivities,
} from "../services/activityService";
import type { Activity } from "../types/activity";
import { ActivityContext } from "./activity-context";

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
    void Promise.resolve().then(loadActivities);
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