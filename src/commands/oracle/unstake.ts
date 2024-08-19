import addressesRaw from "@masa-finance/masa-contracts-oracle/addresses.json";
import { masa } from "../../helpers";
import { isSigner, Messages, NetworkName } from "@masa-finance/masa-sdk";
import {
  OracleNodeStaking,
  OracleNodeStaking__factory,
} from "@masa-finance/masa-contracts-oracle";
import { BigNumber } from "ethers";
import { MasaToken__factory } from "@masa-finance/masa-token"; // todo moe this to the masa sdk

// todo moe this to the masa sdk
const addresses = addressesRaw as Partial<{
  [key in NetworkName]: { [key: string]: string };
}>;

export const unstake = async (amount: string | BigNumber) => {
  amount = BigNumber.from(amount);

  const networkAddresses = addresses[masa.config.networkName];

  if (networkAddresses && isSigner(masa.config.signer)) {
    const address = await masa.config.signer.getAddress();

    const oracleNodeStaking: OracleNodeStaking =
      OracleNodeStaking__factory.connect(
        networkAddresses.OracleNodeStaking,
        masa.config.signer,
      );

    try {
      {
        const tokenAddress = await oracleNodeStaking.masaToken();
        // console.log({ tokenAddress });

        const { allowance, increaseAllowance } = MasaToken__factory.connect(
          tokenAddress,
          masa.config.signer,
        );

        const currentAllowance = await allowance(
          address,
          oracleNodeStaking.address,
        );

        const requiredAllowance = amount.sub(currentAllowance);

        if (requiredAllowance.gt(BigNumber.from(0))) {
          console.log("increasing allowance masa token");

          const { wait, hash } = await increaseAllowance(
            oracleNodeStaking.address,
            requiredAllowance,
          );

          console.log(
            Messages.WaitingToFinalize(
              hash,
              masa.config.network?.blockExplorerUrls?.[0],
            ),
          );

          await wait();
        }
      }

      {
        const { allowance, increaseAllowance } = MasaToken__factory.connect(
          networkAddresses.StakedMasaToken,
          masa.config.signer,
        );

        const currentAllowance = await allowance(
          address,
          oracleNodeStaking.address,
        );

        const requiredAllowance = amount.sub(currentAllowance);

        if (requiredAllowance.gt(BigNumber.from(0))) {
          console.log("increasing allowance on staked masa token");

          const { wait, hash } = await increaseAllowance(
            oracleNodeStaking.address,
            requiredAllowance,
          );

          console.log(
            Messages.WaitingToFinalize(
              hash,
              masa.config.network?.blockExplorerUrls?.[0],
            ),
          );

          await wait();
        }
      }

      const { wait, hash } = await oracleNodeStaking.withdraw(amount);

      console.log(
        Messages.WaitingToFinalize(
          hash,
          masa.config.network?.blockExplorerUrls?.[0],
        ),
      );

      await wait();

      console.log(`Withdrawn ${amount}.`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Withdrawing failed!", error.message);
      }
    }
  }
};
