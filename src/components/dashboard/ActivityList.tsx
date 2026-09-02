import { Card } from "../../ui/Card";
import { ActivityItem } from "./ActivityItem";
import { useActivity } from "../../hooks/useActivity";

function ActivityListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="flex animate-pulse gap-3">
            <div className="h-5 w-5 rounded-full bg-slate-200" />

            <div className="flex-1 space-y-3">
              <div className="h-4 w-4/5 rounded bg-slate-200" />
              <div className="h-3 w-1/3 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ActivityList() {
  const { activities, loading } = useActivity();

  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Atividade recente
          </h3>

          <p className="text-sm text-slate-500">
            Últimas ações realizadas.
          </p>
        </div>

        {loading ? (
          <ActivityListSkeleton />
        ) : activities.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
            <p className="text-sm font-medium text-slate-700">
              Nenhuma atividade registrada.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              As ações realizadas nas tarefas aparecerão aqui.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                title={activity.title}
                time={activity.time}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}