import { masa } from "../../helpers/masa";

export const burn = async (twoFAId: number) => {
  await masa.twoFA.burn(twoFAId);
};
