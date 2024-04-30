import { masa } from "../../../helpers";

export const unstake = async (index: number) => {
  await masa.token.unstake(index);
};
