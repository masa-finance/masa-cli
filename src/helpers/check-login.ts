import { config } from "../utils/storage";
import { middlewareClient } from "../utils/rest";
import { account } from "../utils/ethers";

export const checkLogin = async (): Promise<boolean> => {
  let loggedIn = false;

  const cookie = config.get("cookie");
  // check login
  const checkResponse = await middlewareClient
    .get(`/session/check`, {
      headers: {
        cookie: [cookie],
      },
    })
    .catch(() => {
      // do nothing
    });

  if (checkResponse) {
    const { data: checkData } = checkResponse;

    console.log("User id:", checkData.user.userId);
    console.log("Signer Address:", await account.getAddress());

    loggedIn = true;
  }

  return loggedIn;
};
