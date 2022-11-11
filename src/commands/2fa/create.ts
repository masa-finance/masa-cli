import { masa, readLine } from "../../helpers";

export const create = async (phoneNumber: string) => {
  if (await masa.session.checkLogin()) {
    const address = await masa.config.wallet.getAddress();
    console.log(`Creating 2FA for phone number: '${phoneNumber}'`);

    // load identity
    const identityId = await masa.identity.load(address);
    if (!identityId) return;

    await masa.twoFA.generate(phoneNumber);
    const code = await readLine(
      "The code that has been sent to your phone number: "
    );
    const result = await masa.twoFA.create(phoneNumber, code);

    if (result.success) {
      console.log(`2FA successfully minted: '${result.tokenId}'`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
