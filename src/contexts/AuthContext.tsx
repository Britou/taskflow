import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { FirebaseError } from "firebase/app";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../services/firebase";
import { AuthContext } from "./auth-context";

function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Não foi possível concluir a autenticação. Tente novamente.";
  }

  switch (error.code) {
    case "auth/invalid-credential":
      return "E-mail ou senha inválidos.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/invalid-email":
      return "Informe um e-mail válido.";
    default:
      return "Não foi possível concluir a autenticação. Tente novamente.";
  }
}

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

      return { success: true };
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      return {
        success: false,
        message: getAuthErrorMessage(error),
      };
    }
  }

  async function register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      return { success: true };
    } catch (error) {
      console.error("Erro ao criar conta:", error);

      return {
        success: false,
        message: getAuthErrorMessage(error),
      };
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