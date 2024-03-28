import { BoardList } from "@/types/board.type";
import { axiosClient } from "@/utils/axios";
import accessTokenConfig from "@/utils/get-token";

export const postCreateBoard = async () => {
  const res = await axiosClient.post(
    `/boards`,
    undefined,
    await accessTokenConfig()
  );
  return res;
};

export const getAllBoards = async () => {
  const res = await axiosClient.get(`/boards`, await accessTokenConfig());
  return res;
};

export const putUpdatePosition = async (boards: BoardList) => {
  const res = await axiosClient.put(
    `/boards/`,
    { boards },
    await accessTokenConfig()
  );
  return res;
};

export const getOneBoard = async (boardId: string) => {
  const res = await axiosClient.get(
    `/boards/${boardId}`,
    await accessTokenConfig()
  );
  return res;
};
