import { masa } from "../../helpers/masa";

export const burn = async (soulName: string) => {
  await masa.soulNames.burn(soulName);
};
