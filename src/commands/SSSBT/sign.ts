import { masa } from "../../helpers";

/**
 *
 * @param contractAddress
 * @param receiver
 */
export const signSSSBT = async (contractAddress: string, receiver: string) => {
  const { sign } = await masa.sssbt.connect(contractAddress);

  if (sign) {
    await sign(receiver);
  }
};
