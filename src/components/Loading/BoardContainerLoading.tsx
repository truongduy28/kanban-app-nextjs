/* eslint-disable @next/next/no-img-element */
import React, { FC } from "react";
import Loading from "./Loading";

interface Props {
  isLoading?: boolean;
  error: any;
}
const BoardContainerLoadingAndError: FC<Props> = ({}) => {
  return (
    <div className="fixed right-0 top-0 bottom-0 w-4/5 h-screen flex justify-center items-center">
      <div className="w-max">
        <img src="/images/logo.png" alt="logo" className="w-28" />
        <Loading size="sm" className="mt-5" />
      </div>
    </div>
  );
};

export default BoardContainerLoadingAndError;
