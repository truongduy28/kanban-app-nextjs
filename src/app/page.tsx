"use client";
import OverlayLoading from "@/components/Loading/OverlayLoading";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {
  const { isVerified, isVerifyLoading } = useAuth();

  const route = useRouter();

  useEffect(() => {
    if (!isVerified && !isVerifyLoading) {
      route.push("/auth/login");
    }
  }, [isVerified, isVerifyLoading]);

  return (
    <>
      {isVerifyLoading && <OverlayLoading />}

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        KANBAN HOME{" "}
      </main>
    </>
  );
};

export default HomePage;
