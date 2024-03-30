import EmojiPicker from "@/components/EmojiPicker/EmojiPicker";
import InputText from "@/components/Input/Input";
import { useUpdateOverviewBoard } from "@/hooks/useBoardApi";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";

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

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    setTitleInput(title);
    setDescriptionInput(description);
  }, [boardId]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
    e.target.name === "title"
      ? setTitleInput(e.target.value)
      : setDescriptionInput(e.target.value);
  };

  const handleOverviewUpdate = (): void => {
    mutate(
      {
        title: titleInput,
        description: descriptionInput,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] });
          queryClient.invalidateQueries({ queryKey: ["getAllBoards"] });
        },
      }
    );
  };

  return (
    <section>
      {/* Favorite button */}
      <button>
        {isFavorite ? (
          <BsStarFill color="FFCD4B" size={23} />
        ) : (
          <BsStar color="FFCD4B" size={23} />
        )}
      </button>

      {/* Board icon and name */}
      <div className="py-2 px-5 flex gap-3">
        <EmojiPicker icon={icon} boardId={boardId} />

        <InputText
          clearStyle
          className="text-3xl font-bold outline-gray-300 w-[33vw] cursor-p"
          value={titleInput}
          onChange={handleChangeInput}
          name="title"
          onBlur={handleOverviewUpdate}
        />
      </div>
      {/* Board description */}
      <div className="px-10">
        <p className="whitespace-pre-wrap text-gray-600">{description}</p>
      </div>

      {/* <EmojiPicker /> */}
    </section>
  );
};

export default BoardOverview;
