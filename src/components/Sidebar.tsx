import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 flex-col bg-slate-900 text-white">
      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-3xl font-bold">TaskFlow</h1>

        <p className="mt-1 text-sm text-slate-400">
          Productivity SaaS
        </p>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          <li>
            <button className="flex w-full items-center gap-3 rounded-xl bg-slate-800 px-4 py-3 font-medium transition hover:bg-slate-700">
              <LayoutDashboard size={20} />
              Dashboard
            </button>
          </li>

          <li>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
              <CheckSquare size={20} />
              Tarefas
            </button>
          </li>

          <li>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
              <Calendar size={20} />
              Calendário
            </button>
          </li>

          <li>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
              <BarChart3 size={20} />
              Relatórios
            </button>
          </li>

          <li>
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white">
              <Settings size={20} />
              Configurações
            </button>
          </li>
        </ul>
      </nav>

      {/* Rodapé */}
      <div className="border-t border-slate-800 px-6 py-5">
        <p className="text-xs text-slate-500">
          TaskFlow v1.0.0
        </p>
      </div>
    </aside>
  );
}