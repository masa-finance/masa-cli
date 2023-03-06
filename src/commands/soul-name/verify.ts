import { masa } from "../../helpers";

export const verify = async (soulName: string) => {
  const extension = await masa.contracts.instances.SoulNameContract.extension();

  const result = await masa.soulName.verify(soulName.replace(extension, ""));

  console.log({ result });
};
