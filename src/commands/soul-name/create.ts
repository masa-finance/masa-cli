import { masa } from "../../helpers";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const create = async (
  paymentMethod: PaymentMethod,
  soulName: string,
  duration: number
) => {
  const { success, message } = await masa.soulName.create(
    paymentMethod,
    soulName,
    duration
  );

  if (!success) {
    console.error(message);
  }
};
