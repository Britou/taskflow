import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

type AuthContextType = {
  user: string | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 verifica se já existe usuário salvo (persistência)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  function login(email: string, password: string) {
    // login fake por enquanto (depois vamos ligar no Firebase/API)
    if (email === "admin@email.com" && password === "123") {
      setUser(email);
      localStorage.setItem("user", email);
    } else {
      alert("Credenciais inválidas");
    }
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

// Hook personalizado
export function useAuth() {
  return useContext(AuthContext);
}