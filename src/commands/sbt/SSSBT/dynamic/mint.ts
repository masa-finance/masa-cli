import { masa } from "../../../../helpers";

/**
 *
 * @param contractAddress
 */
export const mintDynamicSSSBT = async (contractAddress: string) => {
  const { mint } = await masa["dynamic-sssbt"].connect(contractAddress);

  await mint?.();
};
