import { masa } from "../../../helpers";
import { BigNumber } from "ethers";

export const breakLink = async (
  creditScoreId: string,
  readerIdentityId: string
) => {
  await masa.creditScore.links.break(
    BigNumber.from(creditScoreId),
    BigNumber.from(readerIdentityId)
  );
};
