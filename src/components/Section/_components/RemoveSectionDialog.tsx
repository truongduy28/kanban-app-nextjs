import Button from "@/components/Button/Button";
import Dialog from "@/components/Dialog/Dialog";
import { useRemoveSection } from "@/hooks/useSectionApi";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useCallback } from "react";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  boardId: string;
  sectionId: string;
}

const RemoveSectionDialog: FC<Props> = ({ onClose, boardId, sectionId }) => {
  const queryClient = useQueryClient();

  // API: to remove a board from database
  const { mutate, isPending } = useRemoveSection(boardId, sectionId);

  const handleRemoveSection = useCallback(() => {
    mutate(undefined, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] });
        toast.success("This section has removed successfully!!");
        onClose();
      },
    });
  }, [mutate, onClose, queryClient]);

  return (
    <Dialog onClose={onClose}>
      <p className="text-center text-lg whitespace-pre-wrap my-5">
        {`Are you sure you \nwant to delete this section?`}
      </p>
      <div className="flex justify-center items-center gap-3 mb-3">
        <Button
          title="Sure!"
          className="w-max"
          color="danger"
          onClick={handleRemoveSection}
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

export default RemoveSectionDialog;
