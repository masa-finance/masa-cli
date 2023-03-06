import { masa } from "../../helpers";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const create = async (
  paymentMethod: PaymentMethod,
  soulName: string,
  duration: number
) => {
  await masa.soulName.create(paymentMethod, soulName, duration);
};
