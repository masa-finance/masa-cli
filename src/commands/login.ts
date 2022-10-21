import { account } from "../utils/ethers";
import { middlewareClient } from "../utils/client";
import { config } from "../utils/config";
import { checkLogin } from "../helpers/check-login";
import { getLoginTemplate } from "../helpers/get-logintemplate";
import { unpackSessionId } from "../helpers/unpack-session-id";

export const login = async () => {
  console.log("Logging in");

  if (await checkLogin()) {
    console.log("Already logged in! Please logout before logging in again.");
  } else {
    const address = await account.getAddress();

    // get challenge
    const getChallengeResponse = await middlewareClient
      .get(`/session/get-challenge`)
      .catch((err: any) => {
        console.error(err.message);
      });

    if (getChallengeResponse) {
      const cookies = getChallengeResponse.headers["set-cookie"];

      if (cookies) config.set("cookie", cookies[0]);

      const { data: challengeData } = getChallengeResponse;

      // sign
      const msg = getLoginTemplate(
        challengeData.challenge,
        challengeData.expires
      );
      console.log(`Signer Address: ${address}`);
      console.log(`Signing '${msg}'`);

      const signature = await account.signMessage(msg);
      console.log(`Signature: ${signature}`);

      const body = {
        address,
        signature,
      };

      const checkSignatureResponse = await middlewareClient
        .post(`/session/check-signature`, body, {
          headers: {
            cookie: cookies,
          },
        })
        .catch((err: any) => {
          console.error(err.message);
        });

      if (checkSignatureResponse) {
        const { data: checkSignatureData } = checkSignatureResponse;

        console.log("\nLogged in as:");
        console.log(`User ID: ${checkSignatureData.id}`);

        if (cookies) {
          console.log(`Session ID: ${unpackSessionId(cookies)}`);
        }
      }
    }
  }
};
