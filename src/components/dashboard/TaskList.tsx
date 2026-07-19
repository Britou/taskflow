import { Card } from "../../ui/Card";
import { TaskItem } from "./TaskItem";

export function TaskList() {
  return (
    <Card>
      <div className="space-y-5">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Próximas tarefas
          </h3>

          <p className="text-sm text-slate-500">
            Acompanhe as atividades em andamento.
          </p>
        </div>

        <div className="space-y-3">
          <TaskItem
            title="Finalizar layout do Dashboard"
            completed
          />

          <TaskItem title="Integrar Firestore" />

          <TaskItem title="Criar CRUD de tarefas" />

          <TaskItem title="Adicionar filtros" />
        </div>
      </div>
    </Card>
  );
}