import {
  getAllBoards,
  postCreateBoard,
  putUpdatePosition,
} from "@/api/board.api";
import { BoardList } from "@/types/board.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateBoard = () => {
  return useMutation<any, any, unknown>({
    mutationFn: postCreateBoard,
  });
};

export const useGetAllBoards = () => {
  return useQuery<BoardList, any, BoardList, string[]>({
    queryKey: ["getAllBoards"],
    queryFn: getAllBoards as any,
  });
};

export const useUpdatePosition = () => {
  return useMutation<any, any, BoardList>({
    mutationFn: (boards: BoardList) => putUpdatePosition(boards),
  });
};
