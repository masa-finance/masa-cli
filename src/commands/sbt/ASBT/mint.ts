import { masa } from "../../../helpers";

export const mintASBT = async (contractAddress: string, receiver: string) => {
  const { mint } = await masa.asbt.connect(contractAddress);

  if (mint) {
    await mint(receiver);
  }
};
