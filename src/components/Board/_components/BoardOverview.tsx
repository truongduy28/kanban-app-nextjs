import EmojiPicker from "@/components/EmojiPicker/EmojiPicker";
import InputText from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import { useFavoriteBoard, useUpdateOverviewBoard } from "@/hooks/useBoardApi";
import { useDialog } from "@/hooks/useDialog";
import { trimSpacesAndNewlines } from "@/utils/trim-spaces";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import RemoveBoardDialog from "./RemoveBoardDialog";

interface Props {
  isFavorite: boolean;
  title: string;
  description: string;
  icon: string;
  boardId: string;
}

const BoardOverview: FC<Props> = ({
  description,
  icon,
  isFavorite,
  title,
  boardId,
}) => {
  const queryClient = useQueryClient();

  // API: to update board overview as title and description
  const { mutate } = useUpdateOverviewBoard(boardId);

  // API: add or remove to list favorite boards
  const { mutate: favoriteMutate } = useFavoriteBoard(boardId);

  const { isShowing: openRemoveDialog, toggle: toggleRemoveDialog } =
    useDialog();

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    setTitleInput(title);
    setDescriptionInput(description);
  }, [boardId, description, title]);

  const handleChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    e.target.name === "title"
      ? setTitleInput(e.target.value)
      : setDescriptionInput(e.target.value);
  };

  const handleOverviewUpdate = (): void => {
    mutate(
      {
        title: trimSpacesAndNewlines(titleInput),
        description: trimSpacesAndNewlines(descriptionInput),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] });
          queryClient.invalidateQueries({ queryKey: ["getAllBoards"] });
          queryClient.invalidateQueries({ queryKey: ["getFavoriteBoards"] });
        },
      }
    );
  };

  const onFavoriteClick = (): void => {
    favoriteMutate(!isFavorite, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] });
        queryClient.invalidateQueries({ queryKey: ["getFavoriteBoards"] });
      },
    });
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        {/* Favorite button */}
        <button onClick={onFavoriteClick}>
          {isFavorite ? (
            <BsStarFill color="FFCD4B" size={23} />
          ) : (
            <BsStar color="FFCD4B" size={23} />
          )}
        </button>

        {/* Delete board button */}
        <button className="w-max drop-shadow-lg" onClick={toggleRemoveDialog}>
          <RiDeleteBin2Line color="f12b46" size={25} />
        </button>
      </div>

      {/* Board icon and name */}
      <div className="py-2 px-5 flex gap-1">
        <EmojiPicker icon={icon} boardId={boardId} />
        <div className="flex-1">
          <InputText
            clearStyle
            className="text-3xl font-bold outline-gray-300 w-full px-2"
            value={titleInput}
            onChange={handleChangeInput}
            name="title"
            onBlur={handleOverviewUpdate}
          />
        </div>
      </div>
      {/* Board description */}
      <div className="px-10">
        <Textarea
          value={descriptionInput}
          className="w-full whitespace-pre-wrap text-gray-500 outline-gray-300 px-2 font-normal"
          name="description"
          onChange={handleChangeInput}
          onBlur={handleOverviewUpdate}
        />
      </div>

      {openRemoveDialog && (
        <RemoveBoardDialog boardId={boardId} onClose={toggleRemoveDialog} />
      )}
    </section>
  );
};

export default BoardOverview;
