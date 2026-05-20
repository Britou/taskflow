import { useAuth } from "../contexts/AuthContext";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-slate-800">
          Dashboard
        </h2>

        <p className="text-slate-500 text-sm">
          Bem-vindo ao TaskFlow
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-slate-600 text-sm">
          {user}
        </span>

        <button
          onClick={logout}
          className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
        >
          Sair
        </button>
      </div>
    </header>
  );
}