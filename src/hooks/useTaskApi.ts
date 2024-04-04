import { postCreateTask } from "@/api/task.api";
import { ICreateTaskBody } from "@/types/task.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateTask = (boardId: string) =>
  useMutation<any, any, ICreateTaskBody>({
    mutationFn: (body: ICreateTaskBody) => postCreateTask(boardId, body),
  });
