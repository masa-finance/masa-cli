import { masa } from "../../../helpers";
import { NetworkName } from "@masa-finance/masa-sdk";

export const send = async (
  to: NetworkName,
  amount: string,
  slippage?: number,
) => {
  await masa.token.bridge.send(
    to,
    amount,
    slippage ? Number(slippage) * 100 : undefined,
  );
};
