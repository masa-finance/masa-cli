import { masa } from "../../helpers";
import { printSoulName } from "@masa-finance/masa-sdk/dist/src/soul-name";

export const show = async (soulName: string) => {
  const details = await masa.soulName.loadSoulNameByName(soulName);
  if (details) printSoulName(details);
};
