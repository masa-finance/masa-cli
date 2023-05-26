import { masa } from "../../../helpers";

/**
 *
 * @param contractAddress
 * @param authorityAddress
 */
export const addAuthoritySSSBT = async (
  contractAddress: string,
  authorityAddress: string
) => {
  const { addAuthority } = await masa.sssbt.connect(contractAddress);

  if (addAuthority) {
    await addAuthority(authorityAddress);
  }
};
