import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    login(email, password);

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
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
            <label className="text-sm text-slate-600">
              E-mail
            </label>

            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="w-full mt-1 p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-slate-600">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full mt-1 p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700 transition font-medium"
          >
            Entrar
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Não possui conta?{" "}
          <Link
            to="/register"
            className="text-slate-900 font-semibold"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}