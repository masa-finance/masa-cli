import { masa } from "../../helpers";
import { listCreditScoresAndPrint } from "@masa-finance/masa-sdk";

export const list = async (address?: string) => {
  await listCreditScoresAndPrint(masa, address);
};
