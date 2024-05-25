import { useCreateBoard } from "@/hooks/useBoardApi";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

const EmptyBoard = () => {
  // API to create new board
  const { mutate, isPending, error } = useCreateBoard();

  const queryClient = useQueryClient();

  const onBoardCreate = useCallback(() => {
    mutate(undefined, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["getAllBoards"] }),
    });
  }, [mutate, queryClient]);

  return (
    <div
      className="fixed right-0 top-0 bottom-0 w-4/5 h-screen flex justify-center items-center cursor-pointer"
      onClick={onBoardCreate}
    >
      <p className="font-medium text-gray-500 text-xl text-center">
        👋😀
        <br />
        You don&#39;t have any boards yet
        <br /> create one now!
      </p>
    </div>
  );
};

export default EmptyBoard;
