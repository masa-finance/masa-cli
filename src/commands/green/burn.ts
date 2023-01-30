import { masa } from "../../helpers";

export const burn = async (greenId: number) => {
  await masa.green.burn(greenId);
};
