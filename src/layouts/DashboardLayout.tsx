import { Outlet, Link } from "react-router-dom";

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">TaskFlow</h1>

        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:text-slate-300">
            Dashboard
          </Link>
          <Link to="/tasks" className="hover:text-slate-300">
            Tasks
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}