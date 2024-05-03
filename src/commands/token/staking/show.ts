import { masa } from "../../../helpers";

export const show = async (address?: string) => {
  await masa.token.staking.show(address);
};
