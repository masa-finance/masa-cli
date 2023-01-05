import { masa } from "../../helpers";

export const burn = async (soulName: string) => {
  await masa.soulName.burn(soulName);
};
