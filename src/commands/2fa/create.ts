import { masa } from "../../helpers/masa";

export const create = async (phoneNumber: string) => {
  await masa.twofa.create(phoneNumber);
};
