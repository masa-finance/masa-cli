import { masa } from "../../../helpers";

/**
 *
 * @param passport the base64 encoded soul linker passport
 */
export const establish = async (passport: string) => {
  await masa.creditScore.links.establish(passport);
};
