import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

async function register(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    return true;
  } catch (error) {
    console.error("Erro ao criar conta:", error);

    return false;
  }
}

import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import { auth } from "../services/firebase";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);

      return true;
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      return false;
    }
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}