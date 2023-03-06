import { masa } from "../../../helpers";
import { PaymentMethod } from "@masa-finance/masa-sdk";

/**
 *
 * @param paymentMethod
 * @param passport the base64 encoded soul linker passport
 */
export const query = async (paymentMethod: PaymentMethod, passport: string) => {
  await masa.creditScore.links.query(paymentMethod, passport);
};
