import { masa } from "../../helpers";

export const verify = async (soulName: string) => {
  const result = await masa.soulName.verify(soulName.replace(".soul", ""));

  console.log({ result });
};
