import {
  ICreateTaskBody,
  IUpdateTaskBody,
  IUpdateTaskPositionBody,
} from "@/types/task.type";
import { axiosClient } from "@/utils/axios";
import accessTokenConfig from "@/utils/get-token";

export const postCreateTask = async (
  boardId: string,
  body: ICreateTaskBody
) => {
  const res = await axiosClient.post(
    `/boards/${boardId}/tasks`,
    body,
    await accessTokenConfig()
  );
  return res;
};

export const putUpdateTaskPosition = async (
  boardId: string,
  body: IUpdateTaskPositionBody
) => {
  const res = await axiosClient.put(
    `/boards/${boardId}/tasks/update-position`,
    body,
    await accessTokenConfig()
  );
  return res;
};

export const putUpdateTask = async (
  boardId: string,
  taskId: string,
  body: IUpdateTaskBody
) => {
  const res = await axiosClient.put(
    `/boards/${boardId}/tasks/${taskId}`,
    body,
    await accessTokenConfig()
  );
  return res;
};

export const deleteTask = async (boardId: string, taskId: string) => {
  const res = await axiosClient.delete(
    `/boards/${boardId}/tasks/${taskId}`,
    await accessTokenConfig()
  );
  return res;
};
