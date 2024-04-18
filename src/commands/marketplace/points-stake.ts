import { masa } from "../../helpers";
import { DataStakingDynamicNative__factory } from "@masa-finance/masa-contracts-marketplace";
import { BigNumber } from "ethers";

export const pointsStake = async (
  contractAddress: string,
  threshold: string = "10",
) => {
  if (!masa.marketplace.isContractAvailable) {
    console.error(`Marketplace is not available on ${masa.config.networkName}`);
    return;
  }

  console.log(`Threshold: ${threshold}`);

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

  const t = BigNumber.from(threshold);

  if (total.gte(t)) {
    console.log("Staking points");
    await stakeAll();
  } else {
    console.log(
      `Skipping, not enough points ${total.toString()}/${t.toString()}`,
    );
  }
};
