import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ children }: any) {
  const { user, loading } = useAuth();

  // ⏳ enquanto verifica login
  if (loading) {
    return <h1>Carregando...</h1>;
  }

  // 🔒 se não estiver logado → volta pro login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ se estiver logado → entra na rota
  return children;
}