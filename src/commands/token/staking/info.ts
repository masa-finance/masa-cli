import { masa } from "../../../helpers";

export const info = async () => {
  await masa.token.staking.info();
};
