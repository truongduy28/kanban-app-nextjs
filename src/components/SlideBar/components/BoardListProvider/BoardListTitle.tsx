import OverlayLoading from "@/components/Loading/OverlayLoading";
import { useCreateBoard } from "@/hooks/useBoardApi";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { BsPlusSquare } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const BoardListTitle = ({
  title,
  isCreateButton,
  className,
}: {
  title: string;
  isCreateButton?: boolean;
  className?: string;
}) => {
  const queryClient = useQueryClient();
  // API to create new board
  const { mutate, isPending, error } = useCreateBoard();

  const onBoardCreate = useCallback(() => {
    mutate(undefined, {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["getAllBoards"] }),
    });
  }, [mutate, queryClient]);

  return (
    <div className={twMerge("flex items-center px-5 py-2", className)}>
      <p className="font-medium text-gray-500 flex-1 text-lg">{title}</p>
      {isCreateButton && (
        <button onClick={onBoardCreate}>
          <BsPlusSquare size={20} color="gray" />
        </button>
      )}
      {isPending && <OverlayLoading />}
    </div>
  );
};
export default BoardListTitle;
