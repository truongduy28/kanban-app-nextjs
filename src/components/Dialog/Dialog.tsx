import React, { FC } from "react";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}
const Dialog: FC<Props> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-40 bg-[#f0f0f052] backdrop-blur-[3px]"
      onClick={(e) => e.currentTarget === e.target && onClose()}
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-1/4 bg-white
    rounded-lg py-4 px-5 shadow-lg"
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
