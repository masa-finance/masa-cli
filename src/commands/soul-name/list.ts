import { masa } from "../../helpers";
import { listSoulNamesAndPrint } from "@masa-finance/masa-sdk";

export const list = async (address?: string) => {
  await listSoulNamesAndPrint(masa, address);
};
