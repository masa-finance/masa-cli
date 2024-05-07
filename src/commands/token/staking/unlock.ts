import { masa } from "../../../helpers";

export const unlock = async (position: number) => {
  await masa.token.staking.unlock(position);
};
