import Button from "@/components/Button/Button";
import React, { FC } from "react";

interface Props {
  boardId: string;
}
const SectionManagers: FC<Props> = ({ boardId }) => {
  return (
    <div>
      {/* Add section button */}
      <span className="text-primary-500 font-semibold mx-5 cursor-pointer hover:bg-gray-50 px-7 py-2 rounded-md text-sm transition-all">
        ADD NEW SECTION
      </span>
      <hr className="h-[2px] w-full mt-4" />

      {/* Sections */}
      <div></div>
    </div>
  );
};

export default SectionManagers;
