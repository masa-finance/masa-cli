import { masa } from "../../helpers/masa";

export const create = async () => {
  await masa.creditScore.create();
};
