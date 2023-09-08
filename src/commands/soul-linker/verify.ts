import { BigNumber } from "ethers";
import { MasaSoulLinker } from "@masa-finance/masa-sdk";

export const verify = async (
  links: MasaSoulLinker,
  tokenId: string,
  readerIdentityId?: string,
) => {
  await links.verify(
    BigNumber.from(tokenId),
    readerIdentityId ? BigNumber.from(readerIdentityId) : undefined,
  );
};
