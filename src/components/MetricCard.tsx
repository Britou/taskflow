type MetricCardProps = {
  title: string;
  value: string;
  description: string;
};

export function MetricCard({
  title,
  value,
  description,
}: MetricCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-slate-900 mt-2">
        {value}
      </h2>

      <span className="text-sm text-emerald-600 mt-2 block">
        {description}
      </span>
    </div>
  );
}
