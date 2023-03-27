import { masa } from "../../helpers";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const create = async (paymentMethod: PaymentMethod) => {
  const { success, message } = await masa.creditScore.create(paymentMethod);

  if (!success) {
    console.error(message);
  }
};
