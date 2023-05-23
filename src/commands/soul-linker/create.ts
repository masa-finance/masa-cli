import { BigNumber } from "ethers";
import { MasaSoulLinker } from "@masa-finance/masa-sdk";

export const create = async (
  links: MasaSoulLinker,
  tokenId: string,
  readerIdentityId: string
) => {
  const { success, message } = await links.create(
    BigNumber.from(tokenId),
    BigNumber.from(readerIdentityId)
  );

  if (!success) {
    console.error(message);
  }
};
