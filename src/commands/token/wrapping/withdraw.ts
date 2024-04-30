import { masa } from "../../../helpers";

export const withdraw = async (amount: string) => {
  await masa.token.withdraw(amount);
};
