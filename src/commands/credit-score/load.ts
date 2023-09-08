import { masa } from "../../helpers";
import { BigNumber } from "ethers";

export const load = async (creditScoreId?: string) => {
  const creditScore = await masa.creditScore.load(
    BigNumber.from(creditScoreId),
  );
  console.log(JSON.stringify({ creditScore }, null, 2));
};
