import { masa } from "../../helpers";

export const show = async (soulName: string) => {
  const details = await masa.soulNames.loadSoulNameByName(soulName);

  console.log(details);
};
