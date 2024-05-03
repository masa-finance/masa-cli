import { masa } from "../../../helpers";

export const unstake = async (position: number) => {
  await masa.token.staking.unstake(position);
};
