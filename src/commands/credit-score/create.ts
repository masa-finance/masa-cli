import { masa } from "../../helpers";

export const create = async () => {
  const result = await masa.creditScore.create();
  if (!result || !result.success) console.error(result?.message);
};
