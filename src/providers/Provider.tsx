import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";
import { AuthProvider } from "./AuthContext";
import SupportProvider from "./SupportProvider";

interface Props {
  children: React.ReactNode;
}
const Provider: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <SupportProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </SupportProvider>
  );
};

export default Provider;
