import { CalendarDays, CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";

type TaskItemProps = {
  title: string;
  description?: string;
  completed?: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  onDelete?: () => void;
  onEdit?: () => void;
  onToggleComplete?: () => void;
};

const priorityLabels = {
  low: "Baixa",
  medium: "Media",
  high: "Alta",
};

const priorityStyles = {
  low: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  high: "bg-red-50 text-red-700 border-red-200",
};

function formatDueDate(dueDate: string) {
  const [year, month, day] = dueDate.split("-");

  if (!year || !month || !day) {
    return dueDate;
  }

  return `${day}/${month}/${year}`;
}

function getTodayDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDueDateStatus(dueDate: string, completed: boolean) {
  if (completed) {
    return {
      label: "Concluída",
      className: "bg-slate-50 text-slate-500 border-slate-200",
    };
  }

  const today = getTodayDateValue();

  if (dueDate < today) {
    return {
      label: "Atrasada",
      className: "bg-red-50 text-red-700 border-red-200",
    };
  }

  if (dueDate === today) {
    return {
      label: "Vence hoje",
      className: "bg-orange-50 text-orange-700 border-orange-200",
    };
  }

  return {
    label: "No prazo",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
}

export function TaskItem({
  title,
  description,
  completed = false,
  priority,
  dueDate,
  onDelete,
  onEdit,
  onToggleComplete,
}: TaskItemProps) {

  const dueDateStatus = dueDate
    ? getDueDateStatus(dueDate, completed)
    : null;

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleComplete}
          aria-label={completed ? "Marcar como pendente" : "Marcar como concluída"}
        >
          {completed ? (
            <CheckCircle2 size={20} />
          ) : (
            <Circle size={20} />
          )}
        </button>

        <div className="space-y-1">
          <span
            className={
              completed
                ? "block text-slate-400 line-through"
                : "block font-medium text-slate-700"
            }
          >
            {title}
          </span>

          {description ? (
            <p className="max-w-xl text-sm text-slate-500">
              {description}
            </p>
          ) : null}

          {dueDate && dueDateStatus ? (
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <CalendarDays size={14} />
                Vence em {formatDueDate(dueDate)}
              </span>

              <span
                className={`rounded-full border px-2 py-0.5 text-xs font-medium ${dueDateStatus.className}`}
              >
                {dueDateStatus.label}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityStyles[priority]}`}
        >
          {priorityLabels[priority]}
        </span>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label="Editar tarefa"
        >
          <Pencil size={16} />
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
          aria-label="Excluir tarefa"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
