import { masa } from "../../helpers";

export const resolve = async (soulName: string) => {
  const address = await masa.soulName.resolve(soulName);

  if (address) {
    console.log(address);
  } else {
    console.error(`${soulName} does not exist!`);
  }
};

export const resolveReverse = async (address: string) => {
  const [soulNames, extension] = await Promise.all([
    masa.soulName.loadSoulNames(address),
    masa.contracts.instances.SoulNameContract.extension(),
  ]);

  if (soulNames.length > 0) {
    console.log("Soul names:", "\n");
    soulNames.forEach((soulName: string) =>
      console.log(`${soulName}${extension}`),
    );
  } else {
    console.log(`No soul names for ${address}`);
  }
};
