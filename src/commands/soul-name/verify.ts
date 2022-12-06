import { masa } from "../../helpers";

export const verify = async (soulName: string) => {
  const result = await masa.soulNames.verify(soulName.replace(".soul", ""));

  console.log({ result });
};
