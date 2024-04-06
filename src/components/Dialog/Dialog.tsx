import React, { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}
const Dialog: FC<Props> = ({ children, onClose, size = "md" }) => {
  const getSize = useMemo(() => {
    switch (size) {
      case "sm":
        return "w-1/6";
      case "md":
        return "w-1/4";
      case "lg":
        return "w-3/5";
      default:
        return "w-1/4";
    }
  }, [size]);
  return (
    <div
      className="fixed inset-0 z-40 bg-[#f0f0f052] backdrop-blur-[3px]"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div
        className={twMerge(
          `absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/4 bg-white
        rounded-lg py-4 px-5 shadow-lg`,
          getSize
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
