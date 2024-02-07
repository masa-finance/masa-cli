import addressesRaw from "@masa-finance/masa-contracts-oracle/addresses.json";
import { masa } from "../../helpers";
import { NetworkName } from "@masa-finance/masa-sdk";
import {
  MasaToken,
  MasaToken__factory,
  OracleNodeStaking,
  OracleNodeStaking__factory,
} from "@masa-finance/masa-contracts-oracle";
import { BigNumber } from "ethers";

// todo moe this to the masa sdk
const addresses = addressesRaw as Partial<{
  [key in NetworkName]: { [key: string]: string };
}>;

export const stake = async (amount: string | BigNumber) => {
  amount = BigNumber.from(amount);
  const address = await masa.config.signer.getAddress();

  const networkAddresses = addresses[masa.config.networkName];

  if (networkAddresses) {
    const oracleNodeStaking: OracleNodeStaking =
      OracleNodeStaking__factory.connect(
        networkAddresses.OracleNodeStaking,
        masa.config.signer,
      );

    try {
      const tokenAddress = await oracleNodeStaking.masaToken();
      // console.log({ tokenAddress });

      const masaToken: MasaToken = MasaToken__factory.connect(
        tokenAddress,
        masa.config.signer,
      );

      const currentBalance = await masaToken.balanceOf(address);

      // console.log("currentBalance", currentBalance.toString());

      if (amount.lt(currentBalance)) {
        console.error("Not enough balance.");
      } else {
        const allowance = await masaToken.allowance(
          address,
          oracleNodeStaking.address,
        );

        const requiredAllowance = amount.sub(allowance);

        // console.log("requiredAllowance", requiredAllowance.toString());

        if (requiredAllowance.gt(BigNumber.from(0))) {
          const { wait } = await masaToken.increaseAllowance(
            oracleNodeStaking.address,
            requiredAllowance,
          );
          await wait();
        }

        const { wait } = await oracleNodeStaking.stake(amount);
        await wait();

        console.log(`Staked ${amount}.`);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Staking failed!", error.message);
      }
    }
  }
};
