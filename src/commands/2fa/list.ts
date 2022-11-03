import { masa } from "../../helpers/masa";

export const list = async (address?: string) => {
  await masa.twofa.list(address);
};
