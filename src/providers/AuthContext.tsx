"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAuthToken } from "@/types/auth";
import React, { createContext, useContext } from "react";

interface AuthContextType {
  user: IAuthToken | null;
  setToken: (user: IAuthToken | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setToken] = useLocalStorage<IAuthToken | null>(
    "KANBAN_AUTH",
    null
  );

  return (
    <AuthContext.Provider value={{ user, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
