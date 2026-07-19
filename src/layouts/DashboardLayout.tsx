import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

export function DashboardLayout() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Conteúdo */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Página */}
        <main className="flex-1 bg-slate-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}