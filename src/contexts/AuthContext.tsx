import { useState } from "react";

import type { ReactNode } from "react";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(() =>
    localStorage.getItem("user")
  );

  const loading = false;

  function login(email: string, password: string) {
    if (email === "admin@email.com" && password === "123") {
      setUser(email);
      localStorage.setItem("user", email);

      return true;
    }

    return false;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}