import {
  deleteRemoveBoard,
  getAllBoards,
  getFavoriteBoards,
  getOneBoard,
  postCreateBoard,
  putFavoriteBoard,
  putUpdateBoard,
  putUpdateFavoritePosition,
  putUpdateIconBoard,
  putUpdatePosition,
  putUpdateTitleAndDescriptionBoard,
} from "@/api/board.api";
import { IBoardItem, IBoardList, IUpdateBoardBody } from "@/types/board.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateBoard = () => {
  return useMutation<any, any, unknown>({
    mutationFn: postCreateBoard,
  });
};

export const useGetAllBoards = () => {
  return useQuery<IBoardList, any, IBoardList, string[]>({
    queryKey: ["getAllBoards"],
    queryFn: getAllBoards as any,
  });
};

export const useUpdatePosition = () => {
  return useMutation<any, any, IBoardList>({
    mutationFn: (boards: IBoardList) => putUpdatePosition(boards),
  });
};

export const useGetOneBoard = (id: string) => {
  return useQuery<any, any, IBoardItem, string[]>({
    queryKey: ["getOneBoard", id],
    queryFn: () => getOneBoard(id) as any,
  });
};

export const useUpdateBoard = (id: string) => {
  return useMutation<any, any, IUpdateBoardBody>({
    mutationFn: (body: IUpdateBoardBody) => putUpdateBoard(id, body),
  });
};

export const useUpdateIconBoard = (id: string) => {
  return useMutation<any, any, string>({
    mutationFn: (icon: string) => putUpdateIconBoard(id, icon),
    onSuccess: () => {},
  });
};

export const useUpdateOverviewBoard = (id: string) => {
  return useMutation<any, any, IUpdateBoardBody>({
    mutationFn: (body: IUpdateBoardBody) =>
      putUpdateTitleAndDescriptionBoard(id, body),
  });
};

export const useDeleteBoard = (id: string) => {
  return useMutation<any, any, unknown>({
    mutationFn: () => deleteRemoveBoard(id),
  });
};

export const useFavoriteBoard = (id: string) => {
  return useMutation<any, any, boolean>({
    mutationFn: (isFavorite: boolean) => putFavoriteBoard(id, isFavorite),
  });
};

export const useGetFavoriteBoards = () => {
  return useQuery<IBoardList, any, IBoardList, string[]>({
    queryKey: ["getFavoriteBoards"],
    queryFn: () => getFavoriteBoards() as any,
  });
};

export const useUpdateFavoritePosition = () => {
  return useMutation<any, any, IBoardList>({
    mutationFn: (boards: IBoardList) => putUpdateFavoritePosition(boards),
  });
};
