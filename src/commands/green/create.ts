import { masa, readLine } from "../../helpers";

export const create = async (phoneNumber: string) => {
  console.log(`Creating Green for phone number: '${phoneNumber}'`);

  const generateResult = await masa.green.generate(phoneNumber);

  if (generateResult) {
    const code = await readLine(
      "The code that has been sent to your phone number: "
    );
    const createResult = await masa.green.create(phoneNumber, code);

    if (createResult.success) {
      console.log(`Green successfully minted: '${createResult.tokenId}'`);
    }
  }
};
