import { ISectionUpdateBody } from "@/types/section.type";
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

export const putUpdateSection = async (
  boardId: string,
  sectionId: string,
  body: ISectionUpdateBody
) => {
  const res = await axiosClient.put(
    `/boards/${boardId}/sections/${sectionId}`,
    body,
    await accessTokenConfig()
  );
  return res;
};

export const deleteRemoveSection = async (
  boardId: string,
  sectionId: string
) => {
  const res = await axiosClient.delete(
    `/boards/${boardId}/sections/${sectionId}`,
    await accessTokenConfig()
  );
  return res;
};
