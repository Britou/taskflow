import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

export function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}