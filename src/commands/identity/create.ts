import { masa } from "../../helpers";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const create = async (
  paymentMethod: PaymentMethod,
  soulName: string,
  duration: number
) => {
  await masa.identity.createWithSoulName(paymentMethod, soulName, duration);
};

export const register = async () => {
  await masa.identity.create();
};
