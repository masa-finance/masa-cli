import { masa } from "../../../helpers";
import { BigNumber } from "ethers";

export const verify = async (tokenId: string, readerIdentityId: string) => {
  await masa.creditScore.links.verify(
    BigNumber.from(tokenId),
    BigNumber.from(readerIdentityId)
  );
};
