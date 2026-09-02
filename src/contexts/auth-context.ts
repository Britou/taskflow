import { createContext } from "react";

export type AuthContextType = {
  user: string | null;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);