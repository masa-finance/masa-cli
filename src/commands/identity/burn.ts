import { masa } from "../../helpers";

export const burn = async () => {
  await masa.identity.burn();
};
