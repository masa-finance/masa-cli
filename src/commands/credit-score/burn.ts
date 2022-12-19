import { masa } from "../../helpers";
import { BigNumber } from "ethers";

export const burn = async (creditScoreId: string) => {
  await masa.creditScore.burn(BigNumber.from(creditScoreId));
};
