import { Bell, Sun } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="flex flex-wrap items-center gap-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Bom dia, Raphael
          <Sun size={28} className="text-amber-500" />
        </h1>

        <p className="mt-1 text-slate-500">
          Bem-vindo de volta ao TaskFlow.
        </p>
      </div>

      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
        <button className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:bg-slate-50">
          <Bell size={18} />
        </button>

        <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            R
          </div>

          <div className="min-w-0">
            <p className="truncate font-medium text-slate-900">Raphael</p>
            <p className="truncate text-sm text-slate-500">
              Desenvolvedor Front-End
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
