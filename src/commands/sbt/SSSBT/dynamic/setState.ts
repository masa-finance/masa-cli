import { masa } from "../../../../helpers";

/**
 *
 * @param contractAddress
 * @param state
 * @param stateValue
 * @param signature
 * @param signatureDate
 * @param authorityAddress
 */
export const dynamicSSSBTSetState = async (
  contractAddress: string,
  state: string,
  stateValue: boolean,
  authorityAddress: string,
  signatureDate: number,
  signature: string,
) => {
  const { setState } = await masa["dynamic-sssbt"].connect(contractAddress);

  await setState?.(
    state,
    stateValue,
    signature,
    signatureDate,
    authorityAddress,
  );
};
