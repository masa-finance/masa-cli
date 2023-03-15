import { masa } from "../../helpers";
import { BigNumber } from "ethers";

export const burn = async (contractAddress: string, SBTId: string) => {
  const { burn } = await masa.sbt.connect(contractAddress);
  await burn(BigNumber.from(SBTId));
};
