import { masa } from "../../helpers";
import { loadSoulNames } from "@masa-finance/masa-sdk";

export const resolve = async (soulName: string) => {
  const owner = await masa.soulName.resolve(soulName);

  if (owner) {
    console.log(owner);
  } else {
    console.error(`${soulName} does not exist!`);
  }
};

export const resolveReverse = async (address: string) => {
  const [soulNames, extension] = await Promise.all([
    loadSoulNames(masa, address),
    masa.contracts.instances.SoulNameContract.extension(),
  ]);

  if (soulNames.length > 0) {
    console.log("Soul names:", "\n");
    soulNames.forEach((soulName: string) =>
      console.log(`${soulName}${extension}`)
    );
  } else {
    console.log(`No soul names for ${address}`);
  }
};
