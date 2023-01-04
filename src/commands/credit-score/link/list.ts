import { masa } from "../../../helpers";
import { BigNumber } from "ethers";

export const list = async (creditScoreId: string) => {
  await masa.creditScore.links.list(BigNumber.from(creditScoreId));
};
