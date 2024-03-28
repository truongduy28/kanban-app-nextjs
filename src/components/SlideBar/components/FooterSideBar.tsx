/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useAuth } from "@/providers/AuthContext";
import { FC } from "react";
import { CiLogout } from "react-icons/ci";

const FooterSideBar: FC = () => {
  const { user } = useAuth();
  return (
    <div className="border-t p-5 pt-7 flex items-center gap-2">
      <img
        src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
        className="w-10"
      />
      <p className="flex flex-col flex-1 leading-5">
        <span>{"username"}</span>
        <span className="text-xs text-gray-700">User of Kanban Zone app</span>
      </p>
      <span className="cursor-pointer rotate-180">
        <CiLogout size={25} />
      </span>
    </div>
  );
};

export default FooterSideBar;
