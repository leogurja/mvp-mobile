"use client";

import { createContext, use, useEffect, useState, type ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, _setToken] = useState<string | null>(null);

  useEffect(() => {
    cookieStore
      .get("token")
      .then((token) => _setToken(token?.value ?? null))
      .catch((err: unknown) => console.error(err));
  }, []);

  const setToken = (newToken: string | null) => {
    _setToken(newToken);

    if (newToken == null) {
      cookieStore.delete("token").catch((err: unknown) => console.error(err));
      return;
    }

    cookieStore
      .set("token", newToken)
      .catch((err: unknown) => console.error(err));
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
