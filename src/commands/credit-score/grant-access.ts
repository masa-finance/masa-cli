import { masa } from "../../helpers";

export const grantAccess = async (
  creditReportId: number,
  receiverIdentityId: number
) => {
  await masa.creditScore.grantAccess(creditReportId, receiverIdentityId);
};
