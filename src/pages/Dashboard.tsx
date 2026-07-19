import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { MetricCard } from "../components/dashboard/MetricCard";
import { TaskList } from "../components/dashboard/TaskList";
import { ActivityList } from "../components/dashboard/ActivityList";

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
          />

          <MetricCard
            title="Concluídas"
            value="18"
            description="75% do total"
          />

          <MetricCard
            title="Pendentes"
            value="6"
            description="3 prioritárias"
          />

          <MetricCard
            title="Produtividade"
            value="75%"
            description="Excelente desempenho"
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