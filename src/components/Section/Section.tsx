"use client";

import { useDialog } from "@/hooks/useDialog";
import { useUpdateSection } from "@/hooks/useSectionApi";
import { useCreateTask } from "@/hooks/useTaskApi";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { LuPlus } from "react-icons/lu";
import InputText from "../Input/Input";
import Loading from "../Loading/Loading";
import RemoveSectionDialog from "./_components/RemoveSectionDialog";

interface Props {
  boardId: string;
  sectionId: string;
  title: string;
  children?: React.ReactNode;
}
const Section: FC<Props> = ({ title, children, boardId, sectionId }) => {
  const queryClient = useQueryClient();

  // API: update section title
  const { mutate } = useUpdateSection(boardId, sectionId);

  // API: create new task in section
  const { mutate: createTaskMutate, isPending: createTaskLoading } =
    useCreateTask(boardId);

  const { isShowing: openRemoveDialog, toggle: toggleRemoveDialog } =
    useDialog();
  const [titleInput, setTitleInput] = useState<string>("");

  useEffect(() => {
    setTitleInput(title);
  }, [title]);

  const handleUpdateTitle = () => {
    mutate(
      { title: titleInput },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] });
        },
      }
    );
  };

  const handleCreateTask = () => {
    createTaskMutate(
      { sectionId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] });
        },
      }
    );
  };

  return (
    <div className="border py-2 px-4">
      <div className="flex items-center gap-3">
        {/* Title */}
        <div className="flex-1">
          <InputText
            value={titleInput}
            className="font-bold outline-gray-300 w-full px-2 py-2"
            clearStyle
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleUpdateTitle}
          />
        </div>
        <button onClick={createTaskLoading ? undefined : handleCreateTask}>
          {createTaskLoading ? (
            <Loading size="xs" />
          ) : (
            <LuPlus size={20} color="#484848" />
          )}
        </button>
        <button onClick={toggleRemoveDialog}>
          <AiOutlineDelete color="#f36d7f" size={20} />
        </button>
      </div>

      {/* Task list of this section  */}
      <div>{children}</div>

      {openRemoveDialog && (
        <RemoveSectionDialog
          boardId={boardId}
          sectionId={sectionId}
          onClose={toggleRemoveDialog}
        />
      )}
    </div>
  );
};

export default Section;
