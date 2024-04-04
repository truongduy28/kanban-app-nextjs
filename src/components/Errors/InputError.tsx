import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  msg: string;
  className?: string;
}
const InputError: FC<Props> = ({ msg, className }) => {
  return (
    <p className={twMerge("text-xs text-red-500 mt-2", className)}>{msg}</p>
  );
};

export default InputError;
