import React, { FC, useEffect, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { twMerge } from "tailwind-merge";
import { useUpdateIconBoard } from "@/hooks/useBoardApi";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  boardId: string;
  icon: string;
}

const EmojiPicker: FC<Props> = ({ icon, boardId }) => {
  const queryClient = useQueryClient();

  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [isShowPicker, setIsShowPicker] = useState(false);

  useEffect(() => {
    setSelectedEmoji(icon);
  }, [boardId]);

  const { mutate } = useUpdateIconBoard(boardId);

  const selectEmoji = (e: any) => {
    setSelectedEmoji(e.native);
    setIsShowPicker(false);

    mutate(e.native, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllBoards"] });
        queryClient.invalidateQueries({ queryKey: ["getOneBoard", boardId] });
      },
    });
  };

  const showPicker = () => setIsShowPicker(!isShowPicker);

  return (
    <div className="relative w-max">
      <p className="text-3xl cursor-pointer" onClick={showPicker}>
        {selectedEmoji}
      </p>
      <div
        className={twMerge(
          "absolute top-full z-10",
          isShowPicker ? "block" : "hidden"
        )}
      >
        <Picker theme="dark" onEmojiSelect={selectEmoji} showPreview={false} />
      </div>
    </div>
  );
};

export default EmojiPicker;
