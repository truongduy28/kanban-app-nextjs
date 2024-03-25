/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Loading from "./Loading";

const OverlayLoading: FC = () => {
  return (
    <div className="fixed inset-0 z-10 bg-[#ffffff50] backdrop-blur-sm flex justify-center items-center">
      <div className="w-max">
        <img src="/images/logo.png" alt="logo" className="w-28" />
        <Loading size="sm" className="mt-5" />
      </div>
    </div>
  );
};

export default OverlayLoading;
