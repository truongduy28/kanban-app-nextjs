import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";
import { AuthProvider } from "./AuthContext";

interface Props {
  children: React.ReactNode;
}
const Provider: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default Provider;
