import { masa } from "../../helpers";

export const send = async (soulName: string, receiver: string) => {
  await masa.soulNames.send(soulName, receiver);
};
