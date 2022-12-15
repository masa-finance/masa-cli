import { masa } from "../../helpers";

export const addPermission = async (
  creditReportId: number,
  signature: string,
  signatureDate: number,
  expirationDate: number
) => {
  await masa.creditScore.addPermission(
    creditReportId,
    signature,
    signatureDate,
    expirationDate
  );
};
