import { Card } from "../../ui/Card";
import { TaskItem } from "./TaskItem";
import { useTasks } from "../../hooks/useTasks";

export function TaskList() {
  const { tasks, loading } = useTasks();

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

        {loading ? (
          <p className="text-sm text-slate-500">
            Carregando tarefas...
          </p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                title={task.title}
                completed={task.completed}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}