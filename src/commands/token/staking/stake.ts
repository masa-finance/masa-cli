import { masa } from "../../../helpers";

export const stake = async (amount: string, duration: number) => {
  await masa.token.staking.stake(amount, Number(duration));
};
