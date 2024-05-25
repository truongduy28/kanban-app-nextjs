import { useGetOneBoard } from "@/hooks/useBoardApi";
import { ISection } from "@/types/section.type";
import { useSearchParams } from "next/navigation";
import ContainerLoading from "../Loading/BoardContainerLoading";
import BoardOverview from "./_components/BoardOverview";
import EmptyBoard from "./_components/EmptyBoard";
import SectionManagers from "./_components/SectionManagers";

const BoardContainer = () => {
  const boardId: string = useSearchParams().get("id") || "";

  // API: get one board by id
  const { data, error, isLoading } = useGetOneBoard(boardId);

  if (isLoading) {
    return <ContainerLoading isLoading={isLoading} error={error} />;
  }
  return !boardId ? (
    <EmptyBoard />
  ) : (
    <div className="fixed right-0 top-0 bottom-0 w-4/5 bg-white h-screen flex flex-col">
      <BoardOverview
        {...(data as any)}
        boardId={boardId}
        isFavorite={data?.favourite as boolean}
      />
      <SectionManagers
        boardId={boardId}
        sections={data?.sections as ISection[]}
      />
    </div>
  );
};

export default BoardContainer;
