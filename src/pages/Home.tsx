import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import { PageLoader } from "../components/common/PageLoader";

export function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader message="Verificando sessão..." />;
  }

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}