import { account } from "../utils/ethers";
import { middlewareClient } from "../utils/rest";
import { config } from "../utils/storage";
import { checkLogin } from "../helpers/check-login";
import { getLoginTemplate } from "../helpers/get-logintemplate";

export const login = async () => {
  if (await checkLogin()) {
    console.log("Already logged in! Please logout before logging in again.");
  } else {
    console.log("Logging in");

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
      console.log("Signer Address:", await account.getAddress());
      console.log(`Signing '${msg}'`);

      const signature = await account.signMessage(msg);
      console.log("signature", signature);

      const body = {
        address: await account.getAddress(),
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
        console.log("User id:", checkSignatureData.id);

        if (cookies) {
          const sid = cookies[0].split(";")[0].split("=")[1];

          console.log("Session ID:", sid);
        }
      }
    }
  }
};
