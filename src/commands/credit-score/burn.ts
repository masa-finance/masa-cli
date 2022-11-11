import { masa } from "../../helpers";

export const burn = async (creditReportId: number) => {
  await masa.creditScore.burn(creditReportId);
};
