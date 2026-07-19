import { Bell, Sun } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-900">
          Bom dia, Raphael
          <Sun size={28} className="text-amber-500" />
        </h1>

        <p className="mt-1 text-slate-500">
          Bem-vindo de volta ao TaskFlow.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50">
          <Bell size={18} />
        </button>

        <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-2 shadow-sm border border-slate-200">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            R
          </div>

          <div>
            <p className="font-medium text-slate-900">Raphael</p>
            <p className="text-sm text-slate-500">
              Desenvolvedor Front-End
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
