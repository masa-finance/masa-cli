import { BigNumber } from "ethers";
import { MasaSoulLinker } from "@masa-finance/masa-sdk";

export const list = async (links: MasaSoulLinker, tokenId: string) => {
  await links.list(BigNumber.from(tokenId));
};
