import { useAuth } from "../contexts/AuthContext";
import { Button } from "../ui/Button";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <div>
        <p className="text-sm text-slate-500">
          Conectado como
        </p>

        <p className="font-medium text-slate-900">
          {user ?? "admin@email.com"}
        </p>
      </div>

      <Button
        variant="secondary"
        onClick={logout}
      >
        Sair
      </Button>
    </header>
  );
}
