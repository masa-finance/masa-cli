import { masa } from "../../helpers/masa";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const create = async (
  soulName: string,
  duration: number,
  paymentMethod: PaymentMethod = "eth"
) => {
  await masa.identity.createWithSoulName(soulName, duration, paymentMethod);
};

export const register = async () => {
  await masa.identity.create();
};
