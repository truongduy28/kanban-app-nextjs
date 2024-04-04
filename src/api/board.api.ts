import { IBoardList, IUpdateBoardBody } from "@/types/board.type";
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

export const putUpdatePosition = async (boards: IBoardList) => {
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

export const putUpdateBoard = async (
  boardId: string,
  body: IUpdateBoardBody
) => {
  const res = await axiosClient.put(
    `/boards/${boardId}`,
    body,
    await accessTokenConfig()
  );
  return res;
};

export const putUpdateIconBoard = async (boardId: string, icon: string) => {
  const res = await axiosClient.put(
    `/boards/${boardId}/icon`,
    { icon: icon },
    await accessTokenConfig()
  );
  return res;
};

export const putUpdateTitleAndDescriptionBoard = async (
  boardId: string,
  { title, description }: IUpdateBoardBody
) => {
  const res = await axiosClient.put(
    `/boards/${boardId}/overview`,
    { title, description },
    await accessTokenConfig()
  );
  return res;
};

export const deleteRemoveBoard = async (boardId: string) => {
  const res = await axiosClient.delete(
    `/boards/${boardId}/delete`,
    await accessTokenConfig()
  );
  return res;
};

export const putFavoriteBoard = async (
  boardId: string,
  isFavorite: boolean
) => {
  const res = await axiosClient.put(
    `/boards/${boardId}/favorite`,
    { favourite: isFavorite },
    await accessTokenConfig()
  );
  return res;
};

export const getFavoriteBoards = async () => {
  const res = await axiosClient.get(
    `/boards/favorites`,
    await accessTokenConfig()
  );
  return res;
};

export const putUpdateFavoritePosition = async (boards: IBoardList) => {
  const res = await axiosClient.put(
    `/boards/favorites`,
    { boards },
    await accessTokenConfig()
  );
  return res;
};
