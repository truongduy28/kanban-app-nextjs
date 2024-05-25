"use client";

import BoardContainer from "@/components/Board/BoardContainer";
import OverlayLoading from "@/components/Loading/OverlayLoading";
import SlideBar from "@/components/SlideBar/SideBar";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";

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
      <div className="w-full min-h-screen bg-gray-50">
        <Suspense>
          <SlideBar />
          <BoardContainer />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
