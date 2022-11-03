import { masa } from "../../helpers/masa";

export const burn = async (twofaId: number) => {
  await masa.twofa.burn(twofaId);
};
