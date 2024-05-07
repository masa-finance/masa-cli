import { masa } from "../../../helpers";

export const claim = async (position: number) => {
  await masa.token.staking.claim(position);
};
