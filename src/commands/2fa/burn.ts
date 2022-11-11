import { masa } from "../../helpers";

export const burn = async (twoFAId: number) => {
  await masa.twoFA.burn(twoFAId);
};
