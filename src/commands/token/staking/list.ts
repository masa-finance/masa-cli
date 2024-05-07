import { masa } from "../../../helpers";

export const list = async (address?: string) => {
  await masa.token.staking.list(address);
};
