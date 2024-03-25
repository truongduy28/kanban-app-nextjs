const getCognitoToken = async () => {
  // const session = await auth.getSession();
  // return {
  //   accessToken: session.getAccessToken().getJwtToken(),
  // };
};

/**
 *
 * @param useIdToken defaultValue = false
 * @returns
 */
const accessTokenConfig = async () => {
  //   const { accessToken } = await getCognitoToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${accessToken}`,
    },
  };
  return config;
};

export default accessTokenConfig;
