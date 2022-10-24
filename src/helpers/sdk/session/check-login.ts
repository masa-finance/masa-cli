import { sessionCheck } from "../helpers/client";
import { unpackSessionId } from "../../unpack-session-id";
import { account } from "../../../utils/ethers";
import { config } from "../../../utils/config";

export const checkLogin = async (): Promise<boolean> => {
  let loggedIn = false;

  const checkSessionResponse = await sessionCheck();
  if (checkSessionResponse) {
    console.log(`User ID: '${checkSessionResponse.user.userId}'`);
    console.log(
      `Session ID: '${unpackSessionId(config.get("cookie") as string)}'`
    );
    console.log(`Signer Address: '${await account.getAddress()}'`);
    console.log("\n");

    loggedIn = true;
  }

  return loggedIn;
};
