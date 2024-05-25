/* eslint-disable @next/next/no-img-element */
"use client";

import OverpayLoading from "@/components/Loading/OverlayLoading";
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}
const AuthLayout: FC<Props> = ({ children }) => {
  const { isVerified, isVerifyLoading } = useAuth();

  const route = useRouter();
  useEffect(() => {
    if (isVerified) {
      route.push("/");
    }
  }, [isVerified, route]);

  return (
    <html lang="en">
      <head>
        <title>Kanban Zone App</title>
      </head>
      <body>
        <section className="bg-gray-50 dark:bg-gray-900">
          {isVerifyLoading && <OverpayLoading />}
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <img src="/images/logo.png" alt="logo" className="w-40 mb-6" />
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              {children}
            </div>
          </div>
          <Toaster />
        </section>
      </body>
    </html>
  );
};

export default AuthLayout;
