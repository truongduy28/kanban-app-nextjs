import { ILoginBody, ISignUpBody } from "@/types/auth";
import { axiosClient } from "@/utils/axios";

export const postLogin = async (body: ILoginBody): Promise<any> => {
  const res = await axiosClient.post(`/auth/login`, body);
  return res;
};

export const postSignUp = async (body: ISignUpBody): Promise<any> => {
  const res = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`,
    { ...body }
  );
  return res;
};

export const postVerifyToken = async () => {
  const res = await axiosClient.post(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-token`,
    undefined
  );
  return res;
};
