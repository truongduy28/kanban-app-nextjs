import { postLogin, postSignUp, postVerifyToken } from "@/api/auth.api";
import { ILoginBody, ISignUpBody } from "@/types/auth";
import { IFormErrs } from "@/types/error";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useLogin = () => {
  return useMutation<any, IFormErrs, ILoginBody>({
    mutationFn: (body: ILoginBody) => postLogin(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["verifyToken"] });
    },
  });
};

export const useSignUp = () => {
  return useMutation<any, IFormErrs, ISignUpBody>({
    mutationFn: (body: ISignUpBody) => postSignUp(body),
  });
};

export const useVerifyToken = () => {
  return useQuery({
    queryKey: ["verifyToken"],
    queryFn: postVerifyToken,
  });
};
