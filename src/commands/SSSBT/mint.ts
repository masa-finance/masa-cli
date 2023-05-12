import { masa } from "../../helpers";
import { MasaSBTSelfSovereign } from "@masa-finance/masa-contracts-identity";

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
  signature: string
) => {
  const { sbtContract } = await masa.sbt.connect<MasaSBTSelfSovereign>(
    contractAddress
  );

  if (sbtContract) {
    return await masa.sbt.SSSBT.mint(
      sbtContract,
      authorityAddress,
      signatureDate,
      signature
    );
  }
};
