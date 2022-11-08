import { masa } from "../../helpers/masa";
import * as readline from "readline";
import { stdin as input, stdout as output } from "process";

const read = (question: string): Promise<string> => {
  const rl = readline.createInterface({ input, output });

  return new Promise((resolve) => {
    rl.question(question, (result) => {
      rl.close();
      return resolve(result);
    });
  });
};

export const create = async (phoneNumber: string) => {
  if (await masa.session.checkLogin()) {
    const address = await masa.config.wallet.getAddress();
    console.log(`Creating 2FA for phone number: '${phoneNumber}'`);

    const identityId = await masa.identity.load(address);
    if (!identityId) return;

    await masa.twofa.generate(phoneNumber);
    const code = await read(
      "The code that has been sent to your Phonenumber: "
    );
    await masa.twofa.create(phoneNumber, code);
  }
};
