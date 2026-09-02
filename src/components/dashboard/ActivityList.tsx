import { Card } from "../../ui/Card";
import { ActivityItem } from "./ActivityItem";
import { useActivity } from "../../hooks/useActivity";

export function ActivityList() {
  const { activities } = useActivity();

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

        {activities.length === 0 ? (
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