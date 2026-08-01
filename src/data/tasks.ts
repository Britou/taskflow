import type { Task } from "../types/task";

export const tasks: Task[] = [
  {
    id: "1",
    title: "Finalizar layout do Dashboard",
    completed: true,
    priority: "high",
  },
  {
    id: "2",
    title: "Integrar Firestore",
    completed: false,
    priority: "high",
  },
  {
    id: "3",
    title: "Criar CRUD de tarefas",
    completed: false,
    priority: "medium",
  },
  {
    id: "4",
    title: "Adicionar filtros",
    completed: false,
    priority: "low",
  },
];