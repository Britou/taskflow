type TaskCardProps = {
  title: string;
  status: string;
  priority: string;
};

export function TaskCard({
  title,
  status,
  priority,
}: TaskCardProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-slate-800">
          {title}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          Prioridade: {priority}
        </p>
      </div>

      <span className="bg-slate-900 text-white text-xs px-3 py-1 rounded-full">
        {status}
      </span>
    </div>
  );
}