import { masa } from "../../../helpers";

/**
 *
 * @param contractAddress
 * @param authorityAddress
 * @param signatureDate
 * @param signature
 */
export const mintSSSBT = async (
  contractAddress: string,
  authorityAddress: string,
  signatureDate: number,
  signature: string,
) => {
  const { mint } = await masa.sssbt.connect(contractAddress);

  if (mint) {
    await mint(authorityAddress, signatureDate, signature);
  }
};
