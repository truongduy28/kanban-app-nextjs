import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import { useDeleteTask } from "@/hooks/useTaskApi";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useCallback } from "react";

interface Props {
  onClose: () => void;
  onCloseTask: () => void;
  boardId: string;
  taskId: string;
}

const RemoveTaskDialog: FC<Props> = ({
  onClose,
  boardId,
  taskId,
  onCloseTask,
}) => {
  const queryClient = useQueryClient();

  // API: to remove a task from database
  const { mutate, isPending } = useDeleteTask(boardId, taskId);

  const handleRemoveTask = useCallback(() => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] });
        onCloseTask();
      },
    });
  }, [mutate, onClose, queryClient]);

  return (
    <Dialog onClose={onClose}>
      <p className="text-center text-lg whitespace-pre-wrap my-5">
        {`Are you sure you \nwant to delete this task?`}
      </p>
      <div className="flex justify-center items-center gap-3 mb-3">
        <Button
          title="Sure!"
          className="w-max"
          color="danger"
          onClick={handleRemoveTask}
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

export default RemoveTaskDialog;
