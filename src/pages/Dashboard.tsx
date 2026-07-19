import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { MetricCard } from "../components/dashboard/MetricCard";
import { TaskList } from "../components/dashboard/TaskList";
import { ActivityList } from "../components/dashboard/ActivityList";
import {ClipboardList, CheckCircle2, Clock3, TrendingUp} from "lucide-react";

export function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardHeader />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Visão Geral
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total de tarefas"
            value="24"
            description="+12% esta semana"
            icon={ClipboardList}
            iconColor="text-blue-600"
          />

          <MetricCard
            title="Concluídas"
            value="18"
            description="75% do total"
            icon={CheckCircle2}
            iconColor="text-emerald-600"
          />

          <MetricCard
            title="Pendentes"
            value="6"
            description="3 prioritárias"
            icon={Clock3}
            iconColor="text-orange-500"
          />

          <MetricCard
            title="Produtividade"
            value="75%"
            description="Excelente desempenho"
            icon={TrendingUp}
            iconColor="text-violet-600"
          />
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <TaskList />
        <ActivityList />
      </section>
    </div>
  );
}