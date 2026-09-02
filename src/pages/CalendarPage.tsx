import { CalendarDays } from "lucide-react";

import { Card } from "../ui/Card";
import { useTasks } from "../hooks/useTasks";

function formatDateLabel(date: string) {
  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
}

export function CalendarPage() {
  const { tasks, loading } = useTasks();

  const tasksWithDueDate = tasks
    .filter((task) => task.dueDate)
    .sort((a, b) => {
      if (!a.dueDate || !b.dueDate) {
        return 0;
      }

      return a.dueDate.localeCompare(b.dueDate);
    });

  const tasksByDate = tasksWithDueDate.reduce<Record<string, typeof tasks>>(
    (acc, task) => {
      if (!task.dueDate) {
        return acc;
      }

      if (!acc[task.dueDate]) {
        acc[task.dueDate] = [];
      }

      acc[task.dueDate].push(task);

      return acc;
    },
    {}
  );

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="space-y-2">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-blue-600" size={28} />

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Calendário
          </h1>
        </div>

        <p className="text-sm text-slate-500">
          Visualize tarefas organizadas por data de vencimento.
        </p>
      </section>

      <Card>
        {loading ? (
          <p className="text-sm text-slate-500">
            Carregando tarefas...
          </p>
        ) : tasksWithDueDate.length === 0 ? (
          <p className="text-sm text-slate-500">
            Nenhuma tarefa com data de vencimento encontrada.
          </p>
        ) : (
          <div className="space-y-6">
            {Object.entries(tasksByDate).map(([date, dateTasks]) => (
              <section key={date} className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {formatDateLabel(date)}
                </h2>

                <div className="space-y-3">
                  {dateTasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3
                            className={
                              task.completed
                                ? "font-medium text-slate-400 line-through"
                                : "font-medium text-slate-800"
                            }
                          >
                            {task.title}
                          </h3>

                          {task.description ? (
                            <p className="text-sm text-slate-500">
                              {task.description}
                            </p>
                          ) : null}
                        </div>

                        <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                          {task.completed ? "Concluída" : "Pendente"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}