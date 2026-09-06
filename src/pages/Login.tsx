import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../ui/Button";

export function Login() {
  const navigate = useNavigate();
  const { login, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const loggedIn = await login(email, password);

    if (!loggedIn) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    setError("");
    navigate("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            TaskFlow
          </h1>

          <p className="text-slate-500 mt-2">
            Faça login para continuar
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm text-slate-600">
              E-mail
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Digite seu e-mail"
              className="w-full mt-1 p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-slate-600">
              Senha
            </label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="Digite sua senha"
              className="w-full mt-1 p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Entrar no TaskFlow
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Não possui conta?{" "}
          <Link
            to="/register"
            className="font-semibold text-slate-900"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}