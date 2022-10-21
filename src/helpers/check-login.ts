import { config } from "../utils/config";
import { middlewareClient } from "../utils/client";
import { account } from "../utils/ethers";
import { unpackSessionId } from "./unpack-session-id";

export const checkLogin = async (): Promise<boolean> => {
  let loggedIn = false;

  // load cookie
  const cookie = config.get("cookie") as string;

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

    console.log(`User ID: ${checkData.user.userId}`);
    console.log(`Session ID: ${unpackSessionId([cookie])}`);
    console.log(`Signer Address: ${await account.getAddress()}`);

    loggedIn = true;
  }

  return loggedIn;
};
