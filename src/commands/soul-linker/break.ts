import { BigNumber } from "ethers";
import { MasaSoulLinker } from "@masa-finance/masa-sdk";

export const breakLink = async (
  links: MasaSoulLinker,
  tokenId: string,
  readerIdentityId: string
) => {
  await links.break(BigNumber.from(tokenId), BigNumber.from(readerIdentityId));
};
