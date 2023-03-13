import { masa } from "../../helpers";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const create = async (paymentMethod: PaymentMethod) => {
  await masa.creditScore.create(paymentMethod);
};
