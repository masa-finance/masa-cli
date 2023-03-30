import { masa } from "../../helpers";
import { listGreensAndPrint } from "@masa-finance/masa-sdk";

export const list = async (address?: string) => {
  await listGreensAndPrint(masa, address);
};
