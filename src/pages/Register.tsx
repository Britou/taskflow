import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

export function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-lg sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <UserPlus size={22} />
        </div>

        <h1 className="mt-6 text-2xl font-bold text-slate-900">
          Cadastro em breve
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          O cadastro real será implementado em uma próxima sprint com Firebase Authentication.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
        >
          Voltar para login
        </Link>
      </div>
    </div>
  );
}