import { masa } from "../../helpers";
import { BigNumber } from "ethers";

export const burn = async (greenId: string) => {
  await masa.green.burn(BigNumber.from(greenId));
};
