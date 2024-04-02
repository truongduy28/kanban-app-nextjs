import { axiosClient } from "@/utils/axios";
import accessTokenConfig from "@/utils/get-token";

export const postCreateSection = async (boardId: string) => {
  const res = await axiosClient.post(
    `/boards/${boardId}/sections`,
    undefined,
    await accessTokenConfig()
  );
  return res;
};
