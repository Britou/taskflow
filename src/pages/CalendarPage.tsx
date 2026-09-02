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

function CalendarPageSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 2 }).map((_, groupIndex) => (
        <section key={groupIndex} className="space-y-3">
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />

          <div className="space-y-3">
            {Array.from({ length: 2 }).map((_, taskIndex) => (
              <div
                key={taskIndex}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="flex animate-pulse flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="h-4 w-2/3 rounded bg-slate-200" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                  </div>

                  <div className="h-6 w-20 rounded-full bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
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
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <section className="space-y-2">
        <div className="flex flex-wrap items-center gap-3">
          <CalendarDays className="text-blue-600" size={28} />

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Calendário
          </h1>
        </div>

        <p className="text-sm text-slate-500">
          Visualize tarefas organizadas por data de vencimento.
        </p>
      </section>

      <Card>
        {loading ? (
          <CalendarPageSkeleton />
        ) : tasksWithDueDate.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
            <p className="text-sm font-medium text-slate-700">
              Nenhuma tarefa com vencimento.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Adicione uma data de vencimento nas tarefas para visualizá-las aqui.
            </p>
          </div>
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
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0 space-y-1">
                          <h3
                            className={
                              task.completed
                                ? "break-words font-medium text-slate-400 line-through"
                                : "break-words font-medium text-slate-800"
                            }
                          >
                            {task.title}
                          </h3>

                          {task.description ? (
                            <p className="break-words text-sm text-slate-500">
                              {task.description}
                            </p>
                          ) : null}
                        </div>

                        <span className="w-fit shrink-0 rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
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