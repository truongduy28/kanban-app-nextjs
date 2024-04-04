"use client";

import React, { FC, useEffect } from "react";
import InputText from "../Input/Input";

interface Props {
  title: string;
  tasks: any[];
}
const Section: FC<Props> = ({ title, tasks = [] }) => {
  const [titleInput, setTitleInput] = React.useState<string>("");

  useEffect(() => {
    setTitleInput(title);
  }, [title]);

  return (
    <div className="border min-w-[25%] w-[25%] py-2 px-4">
      {/* Title */}
      <InputText
        value={titleInput}
        className="font-bold outline-gray-300 w-full px-2 py-2"
        clearStyle
      />
      a
    </div>
  );
};

export default Section;
