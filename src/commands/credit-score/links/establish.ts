import { masa } from "../../../helpers";
import { BigNumber } from "ethers";

/**
 *
 * @param creditScoreId the id of the credit report to retrieve
 * @param passport the base64 encoded soul linker passport
 */
export const establish = async (creditScoreId: string, passport: string) => {
  const unpackedPassport = JSON.parse(atob(passport));

  await masa.creditScore.links.establish(
    BigNumber.from(creditScoreId),
    unpackedPassport.signature,
    unpackedPassport.signatureDate,
    unpackedPassport.expirationDate
  );
};
