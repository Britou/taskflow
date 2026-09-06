import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button } from "../ui/Button";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const loggedIn = login(email, password);

    if (!loggedIn) {
      setError("E-mail ou senha inválidos.");
      return;
    }

    setError("");
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

                {error ? (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm font-medium text-red-700">
                      {error}
                    </p>
                  </div>
                ) : null}

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Cadastro de novos usuários em breve.
        </p>
      </div>
    </div>
  );
}