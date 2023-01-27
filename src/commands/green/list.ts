import { masa } from "../../helpers";

export const list = async (address?: string) => {
  await masa.green.list(address);
};
