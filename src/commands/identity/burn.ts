import { masa } from "../../helpers/masa";

export const burn = async () => {
  await masa.identity.burn();
};
