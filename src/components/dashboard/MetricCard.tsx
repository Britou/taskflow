import { ClipboardList } from "lucide-react";
import { Card } from "../../ui/Card";

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
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <ClipboardList
          size={20}
          className="text-blue-600"
        />
      </div>

      <h3 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </Card>
  );
}