import { Clock3 } from "lucide-react";

type ActivityItemProps = {
  title: string;
  time: string;
};

export function ActivityItem({
  title,
  time,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm">
      <div className="mt-1">
        <Clock3
          size={18}
          className="text-blue-600"
        />
      </div>

      <div className="flex-1">
        <p className="font-medium text-slate-700">
          {title}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {time}
        </p>
      </div>
    </div>
  );
}