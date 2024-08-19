import { masa } from "../../helpers";
import { DataStakingDynamicNative__factory } from "@masa-finance/masa-contracts-marketplace";
import { BigNumber } from "ethers";
import { isSigner, Messages } from "@masa-finance/masa-sdk";

export const pointsStake = async (
  contractAddress: string,
  threshold: string = "10",
) => {
  if (!masa.marketplace.isContractAvailable || !isSigner(masa.config.signer)) {
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

    const { wait, hash } = await stakeAll();

    console.log(
      Messages.WaitingToFinalize(
        hash,
        masa.config.network?.blockExplorerUrls?.[0],
      ),
    );

    await wait();
  } else {
    console.log(
      `Skipping, not enough points ${total.toString()}/${t.toString()}`,
    );
  }
};
