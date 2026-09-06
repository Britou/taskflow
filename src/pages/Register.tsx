import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

import { useAuth } from "../hooks/useAuth";
import { Button } from "../ui/Button";

export function Register() {
  const navigate = useNavigate();
  const { register, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não conferem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    const registered = await register(email, password);

    if (!registered) {
      setError("Não foi possível criar a conta. Verifique os dados informados.");
      return;
    }

    setError("");
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <UserPlus size={22} />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Criar conta
          </h1>

          <p className="mt-2 text-slate-500">
            Cadastre-se para acessar o TaskFlow.
          </p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label htmlFor="register-email" className="text-sm text-slate-600">
              E-mail
            </label>

            <input
              id="register-email"
              type="email"
              autoComplete="email"
              required
              placeholder="Digite seu e-mail"
              className="mt-1 w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-slate-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="register-password" className="text-sm text-slate-600">
              Senha
            </label>

            <input
              id="register-password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Crie uma senha"
              className="mt-1 w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-slate-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="register-confirm-password"
              className="text-sm text-slate-600"
            >
              Confirmar senha
            </label>

            <input
              id="register-confirm-password"
              type="password"
              autoComplete="new-password"
              required
              placeholder="Repita a senha"
              className="mt-1 w-full rounded-lg border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-slate-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm font-medium text-red-700">
                {error}
              </p>
            </div>
          ) : null}

          <Button type="submit" className="w-full">
            Criar conta
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Já possui conta?{" "}
          <Link
            to="/login"
            className="font-semibold text-slate-900"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}