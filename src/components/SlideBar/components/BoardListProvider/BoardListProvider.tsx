import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const BoardListProvider: FC<Props> = ({ children }) => {
  return <div className="flex-1 overflow-auto px-5 pt-3">{children}</div>;
};

export default BoardListProvider;
