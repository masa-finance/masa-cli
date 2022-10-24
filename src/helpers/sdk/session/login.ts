import { masa } from "../../masa";
import { config } from "../../../utils/config";
import { account } from "../../../utils/ethers";
import { unpackSessionId } from "../../unpack-session-id";
import { getLoginTemplate } from "./get-logintemplate";
import { checkSignature, getChallenge } from "../helpers/client";

export const login = async () => {
  console.log("Logging in");

  if (await masa.session.checkLogin()) {
    console.log("Already logged in! Please logout before logging in again.");
  } else {
    // get challenge
    const challengeData = await getChallenge();

    if (challengeData) {
      if (challengeData.cookie) config.set("cookie", challengeData.cookie);

      // sign
      const msg = getLoginTemplate(
        challengeData.challenge,
        challengeData.expires
      );

      const address = await account.getAddress();

      console.log(`Signer Address: '${address}'`);
      console.log(`Signing: \n'${msg}'\n`);

      const signature = await account.signMessage(msg);
      console.log(`Signature: '${signature}'`);

      const checkSignatureData = await checkSignature(address, signature);

      if (checkSignatureData) {
        console.log("\nLogged in as:");
        console.log(`Address: '${address}'`);
        console.log(`User ID: '${checkSignatureData.id}'`);

        if (challengeData.cookie) {
          console.log(`Session ID: '${unpackSessionId(challengeData.cookie)}'`);
        }
      }
    }
  }
};
