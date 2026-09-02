import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { TasksProvider } from "../contexts/TasksContext";
import { ActivityProvider } from "../contexts/ActivityContext";

export function DashboardLayout() {
  return (
    <TasksProvider>
      <div className="min-h-screen bg-slate-100 lg:flex">
        <Sidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header />

          <main className="p-4 sm:p-6 lg:p-8">
            <ActivityProvider>
              <Outlet />
            </ActivityProvider>
          </main>
        </div>
      </div>
    </TasksProvider>
  );
}