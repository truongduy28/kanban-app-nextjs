import { postCreateTask, putUpdateTaskPosition } from "@/api/task.api";
import { ICreateTaskBody, IUpdateTaskPositionBody } from "@/types/task.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateTask = (boardId: string) =>
  useMutation<any, any, ICreateTaskBody>({
    mutationFn: (body: ICreateTaskBody) => postCreateTask(boardId, body),
  });

export const useUpdateTaskPosition = (boardId: string) =>
  useMutation<any, any, IUpdateTaskPositionBody>({
    mutationFn: (body: IUpdateTaskPositionBody) =>
      putUpdateTaskPosition(boardId, body),
  });
