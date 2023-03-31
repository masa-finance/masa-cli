import { masa } from "../../helpers";
import { printSoulName } from "@masa-finance/masa-sdk";

export const show = async (soulName: string) => {
  const extension = await masa.contracts.instances.SoulNameContract.extension();

  const details = await masa.soulName.loadSoulNameByName(
    soulName.replace(extension, "")
  );
  
  if (details) {
    printSoulName(details, undefined, masa.config.verbose);
  }
};
