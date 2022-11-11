import { masa } from "../../helpers";

export const list = async (address?: string) => {
  await masa.soulNames.list(address);
};
