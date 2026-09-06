import { useCallback, useEffect, useState } from "react";

import type { ReactNode } from "react";
import {
  createActivity,
  getActivities,
} from "../services/activityService";
import type { Activity } from "../types/activity";
import { ActivityContext } from "./activity-context";
import { useAuth } from "../hooks/useAuth";

type ActivityProviderProps = {
  children: ReactNode;
};

export function ActivityProvider({
  children,
}: ActivityProviderProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadActivities = useCallback(async () => {
    if (!user) {
      setActivities([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);

      const data = await getActivities(user.uid);

      setActivities(data);
    } catch (error) {
      console.error("Erro ao buscar atividades:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void Promise.resolve().then(loadActivities);
  }, [loadActivities]);

  const addActivity = useCallback(
    async (title: string) => {
      if (!user) {
        return;
      }
      try {
        await createActivity(title, user.uid);

        await loadActivities();
      } catch (error) {
        console.error("Erro ao registrar atividade:", error);
      }
    },
    [loadActivities, user]
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