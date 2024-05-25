import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";
import { AuthProvider } from "./AuthContext";
import SupportProvider from "./SupportProvider";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}
const Provider: FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <SupportProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </SupportProvider>
      <Toaster />
    </>
  );
};

export default Provider;
