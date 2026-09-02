import { useContext } from "react";

import { ActivityContext } from "../contexts/activity-context";

export function useActivity() {
  const context = useContext(ActivityContext);

  if (!context) {
    throw new Error("useActivity deve ser usado dentro de um ActivityProvider.");
  }

  return context;
}