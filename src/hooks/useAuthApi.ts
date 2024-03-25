import { postLogin, postSignUp } from "@/api/auth.api";
import { ILoginBody, ISignUpBody } from "@/types/auth";
import { IFormErrs } from "@/types/error";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation<any, IFormErrs, ILoginBody>({
    mutationFn: (body: ILoginBody) => postLogin(body),
  });
};

export const useSignUp = () => {
  return useMutation<any, IFormErrs, ISignUpBody>({
    mutationFn: (body: ISignUpBody) => postSignUp(body),
  });
};
