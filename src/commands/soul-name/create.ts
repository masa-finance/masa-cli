import { masa } from "../../helpers/masa";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const create = async (
  soulName: string,
  duration: number,
  paymentMethod: PaymentMethod = "eth"
) => {
  await masa.soulNames.create(soulName, duration, paymentMethod);
};
