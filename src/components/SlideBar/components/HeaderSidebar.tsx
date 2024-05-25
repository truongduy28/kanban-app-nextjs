import { CiCircleChevDown } from "react-icons/ci";

const HeaderSideBar = () => {
  return (
    <div className="flex items-center p-5 pb-7">
      <img src="/images/logo.png" className="w-[45%]" />
      <div className="flex-1" />
      <span className="cursor-pointer">
        <CiCircleChevDown size={22} />
      </span>
    </div>
  );
};

export default HeaderSideBar;
