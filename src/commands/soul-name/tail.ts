import { masa } from "../../helpers";
import { tailSoulNamesAndPrint } from "@masa-finance/masa-sdk";

export const tail = async (limit?: number) => {
  await tailSoulNamesAndPrint(masa, limit);
};
