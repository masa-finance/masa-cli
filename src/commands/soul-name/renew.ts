import { masa } from "../../helpers";

export const renew = async (soulName: string, years: number) => {
  await masa.soulName.renew(soulName, years);
};
