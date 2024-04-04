import {
  deleteRemoveSection,
  postCreateSection,
  putUpdateSection,
} from "@/api/section.api";
import { ISectionUpdateBody } from "@/types/section.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateSection = (id: string) => {
  return useMutation<any, any, unknown>({
    mutationFn: () => postCreateSection(id),
  });
};

export const useUpdateSection = (boardId: string, sectionId: string) => {
  return useMutation<any, any, ISectionUpdateBody>({
    mutationFn: (body: ISectionUpdateBody) =>
      putUpdateSection(boardId, sectionId, body),
  });
};

export const useRemoveSection = (boardId: string, sectionId: string) => {
  return useMutation<any, any, unknown>({
    mutationFn: () => deleteRemoveSection(boardId, sectionId),
  });
};
