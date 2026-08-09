import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { TasksProvider } from "../contexts/TasksContext";

export function DashboardLayout() {
  return (
  <TasksProvider>
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  </TasksProvider>
);
}