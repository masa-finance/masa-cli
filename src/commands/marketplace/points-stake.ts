import { masa } from "../../helpers";
import { DataStakingDynamicNative__factory } from "@masa-finance/masa-contracts-marketplace";
import { BigNumber } from "ethers";

export const pointsStake = async (contractAddress: string) => {
  const { getEligibleStakingAmounts, stakeAll } =
    DataStakingDynamicNative__factory.connect(
      contractAddress,
      masa.config.signer,
    );

  const stakes = await getEligibleStakingAmounts(
    await masa.config.signer.getAddress(),
  );

  let total = BigNumber.from(0);

  for (const stake of stakes) {
    total = total.add(stake.amount);
  }

  if (total.gte(BigNumber.from(10))) {
    console.log("staking points");
    await stakeAll();
  } else {
    console.log("skipping not enough points", total.toString());
  }
};
