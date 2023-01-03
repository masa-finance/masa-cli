import { masa } from "../../../helpers";
import { BigNumber } from "ethers";

export const create = async (
  creditReportId: string,
  readerIdentityId: string
) => {
  await masa.creditScore.links.create(
    BigNumber.from(creditReportId),
    BigNumber.from(readerIdentityId)
  );
};
