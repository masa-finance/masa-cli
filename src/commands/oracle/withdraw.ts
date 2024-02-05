import addressesRaw from "@masa-finance/masa-contracts-oracle/addresses.json";
import { masa } from "../../helpers";
import { NetworkName } from "@masa-finance/masa-sdk";
import {
  OracleNodeStaking,
  OracleNodeStaking__factory,
} from "@masa-finance/masa-contracts-oracle";
import { BigNumber } from "ethers";

// todo moe this to the masa sdk
const addresses = addressesRaw as Partial<{
  [key in NetworkName]: { [key: string]: string };
}>;

export const withdraw = async (amount: string | BigNumber) => {
  amount = BigNumber.from(amount);

  const networkAddresses = addresses[masa.config.networkName];

  if (networkAddresses) {
    const oracleNodeStaking: OracleNodeStaking =
      OracleNodeStaking__factory.connect(
        networkAddresses.OracleNodeStaking,
        masa.config.signer,
      );

    try {
      const { wait } = await oracleNodeStaking.withdraw(amount);
      await wait();

      console.log(`Withdrawn ${amount}.`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Withdrawing failed!", error.message);
      }
    }
  }
};
