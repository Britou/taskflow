import type { LucideIcon } from "lucide-react";
import { Card } from "../../ui/Card";

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
};

export function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-blue-600",
}: MetricCardProps) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {title}
        </p>

        <Icon
          size={20}
          className={iconColor}
        />
      </div>

      <h3 className="mt-6 break-words text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {description}
      </p>
    </Card>
  );
}