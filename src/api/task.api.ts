import { ICreateTaskBody } from "@/types/task.type";
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
