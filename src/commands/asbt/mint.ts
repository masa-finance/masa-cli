import { masa } from "../../helpers";

export const mintASBT = async (contractAddress: string, receiver: string) => {
  const { mintASBT } = await masa.sbt.connect(contractAddress);
  await mintASBT(receiver);
};
