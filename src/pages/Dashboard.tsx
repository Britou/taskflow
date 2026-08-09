import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { MetricCard } from "../components/dashboard/MetricCard";
import { TaskList } from "../components/dashboard/TaskList";
import { ActivityList } from "../components/dashboard/ActivityList";
import { useTasks } from "../hooks/useTasks";
import {
  CheckCircle2, Clock3, ListTodo, TrendingUp, } from "lucide-react";

export function Dashboard() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  const productivity =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

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
            value={String(totalTasks)}
            description="Tarefas cadastradas"
            icon={ListTodo}
            iconColor="text-blue-600"
          />

          <MetricCard
            title="Concluídas"
            value={String(completedTasks)}
            description="Tarefas finalizadas"
            icon={CheckCircle2}
            iconColor="text-emerald-600"
          />

          <MetricCard
            title="Pendentes"
            value={String(pendingTasks)}
            description="Tarefas em aberto"
            icon={Clock3}
            iconColor="text-amber-600"
          />

          <MetricCard
            title="Produtividade"
            value={`${productivity}%`}
            description="Taxa de conclusão"
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