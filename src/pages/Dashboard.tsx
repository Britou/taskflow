import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { MetricCard } from "../components/dashboard/MetricCard";
import { TaskList } from "../components/dashboard/TaskList";
import { ActivityList } from "../components/dashboard/ActivityList";
import { metrics } from "../data/metrics";

export function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardHeader />

      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Visão Geral
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              description={metric.description}
              icon={metric.icon}
              iconColor={metric.iconColor}
            />
          ))}
        </div>
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <TaskList />
        <ActivityList />
      </section>
    </div>
  );
}