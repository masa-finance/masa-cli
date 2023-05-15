import { masa } from "../../helpers";
import { ReferenceSBTSelfSovereign } from "@masa-finance/masa-contracts-identity";

/**
 *
 * @param contractAddress
 * @param receiver
 */
export const signSSSBT = async (contractAddress: string, receiver: string) => {
  const { sbtContract } = await masa.sbt.connect<ReferenceSBTSelfSovereign>(
    contractAddress
  );

  if (sbtContract) {
    await masa.sbt.SSSBT.sign(sbtContract, receiver);
  }
};
