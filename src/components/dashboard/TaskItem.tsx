import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";

type TaskItemProps = {
  title: string;
  completed?: boolean;
  priority: "low" | "medium" | "high";
  onDelete?: () => void;
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

export function TaskItem({
  title,
  completed = false,
  priority,
  onDelete,
}: TaskItemProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm">
      <div className="flex items-center gap-3">
        {completed ? (
          <CheckCircle2
            size={20}
            className="text-emerald-500"
          />
        ) : (
          <Circle
            size={20}
            className="text-slate-400"
          />
        )}

        <span
          className={
            completed
              ? "text-slate-400 line-through"
              : "font-medium text-slate-700"
          }
        >
          {title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${priorityStyles[priority]}`}
        >
          {priorityLabels[priority]}
        </span>

        <button
          type="button"
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