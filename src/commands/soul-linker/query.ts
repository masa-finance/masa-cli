import { MasaSoulLinker, PaymentMethod } from "@masa-finance/masa-sdk";

/**
 *
 * @param links
 * @param paymentMethod
 * @param passport the base64 encoded soul linker passport
 */
export const query = async (
  links: MasaSoulLinker,
  paymentMethod: PaymentMethod,
  passport: string,
) => {
  await links.query(paymentMethod, passport);
};
