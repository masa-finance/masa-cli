import { masa } from "../../helpers";

export const deposit = async (amount: string) => {
  await masa.token.deposit(amount);
};
