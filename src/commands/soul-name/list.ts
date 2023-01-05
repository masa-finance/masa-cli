import { masa } from "../../helpers";

export const list = async (address?: string) => {
  await masa.soulName.list(address);
};
