import { masa } from "../../../../helpers";

/**
 *
 * @param contractAddress
 * @param receiver
 * @param state
 * @param stateValue
 */
export const signSetStateDynamicSSSBT = async (
  contractAddress: string,
  receiver: string,
  state: string,
  stateValue: boolean,
) => {
  const { signSetState } = await masa["dynamic-sssbt"].connect(contractAddress);

  await signSetState?.(receiver, state, stateValue);
};
