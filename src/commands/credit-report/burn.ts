import { masa } from "../../helpers/masa";

export const burn = async (creditReportId: number) => {
  await masa.creditScore.burn(creditReportId);
};
