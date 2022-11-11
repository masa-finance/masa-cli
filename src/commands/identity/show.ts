import { masa } from "../../helpers";

export const show = async (address?: string) => {
  await masa.identity.show(address);
};
