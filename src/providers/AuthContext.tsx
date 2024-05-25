"use client";

import { useVerifyToken } from "@/hooks/useAuthApi";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { IAuthToken } from "@/types/auth";
import React, { createContext, useContext, useMemo } from "react";

interface AuthContextType {
  user: IAuthToken | null;
  setToken: (user: IAuthToken | null) => void;
  isVerified: boolean;
  isVerifyLoading: boolean;
  signOut: () => void;
  reVerifyToken: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: verifyData,
    isLoading: verifyLoading,
    refetch: reVerifyToken,
  } = useVerifyToken();

  const [token, setToken] = useLocalStorage<IAuthToken | null>(
    process.env.NEXT_PUBLIC_TOKEN_KEY as string,
    null
  );

  const signOut = () => {
    localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_KEY as string);
    setToken(null);
  };

  const isVerified = useMemo(() => {
    if (!token) return false;
    return !!verifyData;
  }, [verifyData, token]);

  const value = {
    user: token,
    setToken,
    isVerifyLoading: verifyLoading,
    isVerified: !!isVerified,
    signOut,
    reVerifyToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
