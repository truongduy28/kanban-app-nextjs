import { ILoginBody, ISignUpBody } from "@/types/auth";
import { axiosClient } from "@/utils/axios";
import accessTokenConfig from "@/utils/get-token";

export const postLogin = async (body: ILoginBody): Promise<any> => {
  const res = await axiosClient.post(`/auth/login`, body);
  return res;
};

export const postSignUp = async (body: ISignUpBody): Promise<any> => {
  const res = await axiosClient.post(`/auth/signup`, { ...body });
  return res;
};

export const postVerifyToken = async () => {
  const config = await accessTokenConfig();
  const res = await axiosClient.post(`/auth/verify-token`, undefined, config);
  return res;
};
