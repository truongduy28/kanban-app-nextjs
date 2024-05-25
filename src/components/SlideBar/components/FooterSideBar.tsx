/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useAuth } from "@/providers/AuthContext";
import { FC, useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";

const FooterSideBar: FC = () => {
  const { user } = useAuth();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the component once it is mounted on the client to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <div className="p-5 pt-7 flex items-center gap-2">
      <img
        src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
        className="w-10"
      />
      <p className="flex flex-col flex-1 leading-5">
        <p>{user?.user.username}</p>
        <p className="text-xs text-gray-700">User of Kanban Zone app</p>
      </p>
      <span className="cursor-pointer rotate-180">
        <CiLogout size={25} />
      </span>
    </div>
  );
};

export default FooterSideBar;
