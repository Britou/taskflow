import { useAuth } from "../hooks/useAuth";
import { Button } from "../ui/Button";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div className="min-w-0">
        <p className="text-sm text-slate-500">
          Conectado como
        </p>

        <p className="break-words font-medium text-slate-900">
          {user ?? "admin@email.com"}
        </p>
      </div>

      <Button
        variant="secondary"
        className="w-full sm:w-auto"
        onClick={logout}
      >
        Sair
      </Button>
    </header>
  );
}
