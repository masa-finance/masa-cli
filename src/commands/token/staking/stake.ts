import { masa } from "../../../helpers";

export const stake = async (amount: string, duration: number) => {
  await masa.token.stake(amount, duration);
};
