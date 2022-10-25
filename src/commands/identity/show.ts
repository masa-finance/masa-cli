import { masa } from "../../helpers/masa";

export const show = async (address?: string) => {
  await masa.identity.show(address);
};
