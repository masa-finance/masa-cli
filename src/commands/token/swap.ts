import { masa } from "../../helpers";
import { NetworkName } from "@masa-finance/masa-sdk";

export const swap = async (
  to: NetworkName,
  amount: string,
  slippage?: number,
) => {
  await masa.token.swap(to, amount, slippage);
};
