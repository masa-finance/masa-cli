import { masa } from "../../helpers";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const create = async (paymentMethod: PaymentMethod) => {
  const result = await masa.creditScore.create(paymentMethod);
  if (!result || !result.success) console.error(result?.message);
};
