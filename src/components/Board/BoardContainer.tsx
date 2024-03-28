import { useGetOneBoard } from "@/hooks/useBoardApi";
import { useSearchParams } from "next/navigation";
import React from "react";
import ContainerLoading from "../Loading/BoardContainerLoading";
import BoardOverview from "./_components/BoardOverview";

const BoardContainer = () => {
  const boardId: string = useSearchParams().get("id") || "";

  // API: get one board by id
  const { data, error, isLoading } = useGetOneBoard(boardId);

  if (isLoading) {
    return <ContainerLoading isLoading={isLoading} error={error} />;
  }
  return (
    <div className="fixed right-0 top-0 bottom-0 w-4/5 bg-white h-screen p-5">
      <BoardOverview {...data} />
    </div>
  );
};

export default BoardContainer;
