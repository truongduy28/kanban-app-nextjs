import { IAuthToken } from "@/types/auth";

/**
 *
 * @param useIdToken defaultValue = false
 * @returns
 */
const accessTokenConfig = async () => {
  const storageToken = await localStorage.getItem(
    process.env.NEXT_PUBLIC_TOKEN_KEY as string
  );
  const user = !storageToken ? null : JSON.parse(storageToken as string);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${(user as IAuthToken).token}`,
    },
  };
  return config;
};

export default accessTokenConfig;
