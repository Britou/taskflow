import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";

export function Sidebar() {
  return (
    <aside className="flex w-full flex-col bg-slate-900 text-white lg:min-h-screen lg:w-64">
      {/* Logo */}
      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-3xl font-bold">TaskFlow</h1>

        <p className="mt-1 text-sm text-slate-400">
          Productivity SaaS
        </p>
      </div>

      {/* Navegação */}
      <nav className="flex-1 overflow-x-auto px-4 py-4 lg:py-6">
        <ul className="flex gap-2 lg:block lg:space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          </li>

          <li>
            <button
              type="button"
              disabled
              className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-slate-500"
              title="Em breve"
            >
              <CheckSquare size={20} />
              Tarefas
            </button>
          </li>

          <li>
            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Calendar size={20} />
              Calendário
            </NavLink>
          </li>

          <li>
            <button
              type="button"
              disabled
              className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-slate-500"
              title="Em breve"
            >
              <BarChart3 size={20} />
              Relatórios
            </button>
          </li>

          <li>
            <button
              type="button"
              disabled
              className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-4 py-3 text-slate-500"
              title="Em breve"
            >
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