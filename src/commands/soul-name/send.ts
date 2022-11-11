import { masa } from "../../helpers/masa";

export const send = async (soulName: string, receiver: string) => {
  await masa.soulNames.send(soulName, receiver);
};
