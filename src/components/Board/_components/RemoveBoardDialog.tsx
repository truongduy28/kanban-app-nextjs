import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import { useDeleteBoard } from "@/hooks/useBoardApi";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useCallback } from "react";

interface Props {
  onClose: () => void;
  boardId: string;
}

const RemoveBoardDialog: FC<Props> = ({ onClose, boardId }) => {
  const queryClient = useQueryClient();

  // API: to remove a board from database
  const { mutate, isPending } = useDeleteBoard(boardId);

  const handleRemoveBoard = useCallback(() => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllBoards"] });
        onClose();
      },
    });
    onClose();
  }, [mutate, onClose, queryClient]);

  return (
    <Dialog onClose={onClose}>
      <p className="text-center text-lg whitespace-pre-wrap my-5">
        {`Are you sure you \nwant to delete this board?`}
      </p>
      <div className="flex justify-center items-center gap-3 mb-3">
        <Button
          title="Sure!"
          className="w-max"
          color="danger"
          onClick={handleRemoveBoard}
          isLoading={isPending}
        />
        <Button
          title="Cancel"
          className="w-max"
          color="light"
          onClick={onClose}
        />
      </div>
    </Dialog>
  );
};

export default RemoveBoardDialog;
