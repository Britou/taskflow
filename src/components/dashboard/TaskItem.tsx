import { CheckCircle2, Circle } from "lucide-react";

type TaskItemProps = {
  title: string;
  completed?: boolean;
};

export function TaskItem({
  title,
  completed = false,
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
    </div>
  );
}