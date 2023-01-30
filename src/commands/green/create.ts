import { masa, readLine } from "../../helpers";

export const create = async (phoneNumber: string) => {
  if (await masa.session.checkLogin()) {
    console.log(`Creating 2FA for phone number: '${phoneNumber}'`);

    // load identity
    const { identityId } = await masa.identity.load();
    if (!identityId) return;

    await masa.green.generate(phoneNumber);
    const code = await readLine(
      "The code that has been sent to your phone number: "
    );
    const result = await masa.green.create(phoneNumber, code);

    if (result.success) {
      console.log(`2FA successfully minted: '${result.tokenId}'`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
