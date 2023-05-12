import { masa } from "../../helpers";
import { MasaSBTSelfSovereign } from "@masa-finance/masa-contracts-identity";

/**
 *
 * @param contractAddress
 * @param receiver
 */
export const signSSSBT = async (contractAddress: string, receiver: string) => {
  const { sbtContract } = await masa.sbt.connect<MasaSBTSelfSovereign>(
    contractAddress
  );

  if (sbtContract) {
    return await masa.sbt.SSSBT.sign(sbtContract, receiver);
  }
};
