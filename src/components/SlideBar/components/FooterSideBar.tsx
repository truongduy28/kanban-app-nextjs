/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useAuth } from "@/providers/AuthContext";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";

const FooterSideBar: FC = () => {
  const navigate = useRouter();

  const { user, signOut } = useAuth();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the component once it is mounted on the client to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  const handleLogout = async () => {
    await signOut();
    navigate.replace("/auth/login");
  };

  return (
    <div className="p-5 pt-7 flex items-center gap-2">
      <img
        src={
          user?.user?.avatar ||
          "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
        }
        className="w-10 h-10 object-cover rounded-full shadow-md"
      />
      <div className="flex flex-col flex-1 leading-5">
        <p>{user?.user.username}</p>
        <p className="text-xs text-gray-700">User of Kanban Zone app</p>
      </div>
      <span className="cursor-pointer rotate-180" onClick={handleLogout}>
        <CiLogout size={25} />
      </span>
    </div>
  );
};

export default FooterSideBar;
