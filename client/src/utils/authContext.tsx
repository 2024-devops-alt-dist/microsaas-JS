import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getToken, setToken, clearToken } from "./auth";

interface AuthContextType {
  token: string | null;
  isLogged: boolean;
  login: (token: string, useSession?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null);

  // initialize from storage on mount
  useEffect(() => {
    const t = getToken();
    setTokenState(t);
  }, []);

  const login = (t: string, useSession = false) => {
    setToken(t, useSession);
    setTokenState(t);
  };

  const logout = () => {
    clearToken();
    setTokenState(null);
  };

  const value: AuthContextType = {
    token,
    isLogged: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
