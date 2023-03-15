import { masa } from "../../helpers";

export const list = async (contractAddress: string, address?: string) => {
  const { list } = await masa.sbt.connect(contractAddress);
  await list(address);
};
