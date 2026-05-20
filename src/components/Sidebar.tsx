import { NavLink } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold">TaskFlow</h1>
        <p className="text-slate-400 text-sm">
          Productivity SaaS
        </p>
      </div>

      {/* Navegação */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-slate-700"
                : "hover:bg-slate-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `p-3 rounded-lg transition ${
              isActive
                ? "bg-slate-700"
                : "hover:bg-slate-800"
            }`
          }
        >
          Tasks
        </NavLink>
      </nav>
    </aside>
  );
}