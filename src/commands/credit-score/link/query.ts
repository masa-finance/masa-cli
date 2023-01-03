import { masa } from "../../../helpers";

/**
 *
 * @param passport the base64 encoded soul linker passport
 */
export const query = async (passport: string) => {
  await masa.creditScore.links.query(passport);
};
