import { postCreateSection } from "@/api/section.api";
import { useMutation } from "@tanstack/react-query";

export const useCreateSection = (id: string) => {
  return useMutation<any, any, unknown>({
    mutationFn: () => postCreateSection(id),
  });
};
