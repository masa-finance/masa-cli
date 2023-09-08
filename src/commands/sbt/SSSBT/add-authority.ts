import { masa } from "../../../helpers";

/**
 *
 * @param contractAddress
 * @param authorityAddress
 */
export const addAuthoritySSSBT = async (
  contractAddress: string,
  authorityAddress: string,
) => {
  const { contract } = await masa.sssbt.connect(contractAddress);

  if (contract) {
    await contract.addAuthority(authorityAddress);
  }
};
