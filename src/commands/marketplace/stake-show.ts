import { masa } from "../../helpers";
import { BigNumber } from "ethers";

export const stakeShow = async (
  tokenId: BigNumber | string,
  address?: string,
) => {
  address = address || (await masa.config.signer.getAddress());

  console.log({ address });
};
