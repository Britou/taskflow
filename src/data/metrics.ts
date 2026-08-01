import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react";

import type { Metric } from "../types/metric";

export const metrics: Metric[] = [
  {
    title: "Total de tarefas",
    value: "24",
    description: "+12% esta semana",
    icon: ClipboardList,
    iconColor: "text-blue-600",
  },
  {
    title: "Concluídas",
    value: "18",
    description: "75% do total",
    icon: CheckCircle2,
    iconColor: "text-emerald-600",
  },
  {
    title: "Pendentes",
    value: "6",
    description: "3 prioritárias",
    icon: Clock3,
    iconColor: "text-orange-500",
  },
  {
    title: "Produtividade",
    value: "75%",
    description: "Excelente desempenho",
    icon: TrendingUp,
    iconColor: "text-violet-600",
  },
];