import { Card } from "../../ui/Card";
import { activities } from "../../data/activities";
import { ActivityItem } from "./ActivityItem";

export function ActivityList() {
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

        <div className="space-y-3">
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              title={activity.title}
              time={activity.time}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}