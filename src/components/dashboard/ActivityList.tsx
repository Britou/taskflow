import { Card } from "../../ui/Card";
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
          <ActivityItem
            title="Raphael criou uma nova tarefa."
            time="Há 2 minutos"
          />

          <ActivityItem
            title="Dashboard atualizado."
            time="Há 30 minutos"
          />

          <ActivityItem
            title="Login realizado."
            time="Hoje às 09:15"
          />

          <ActivityItem
            title="Projeto sincronizado."
            time="Ontem"
          />
        </div>
      </div>
    </Card>
  );
}