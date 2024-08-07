import { masa } from "../../helpers";
import { isSigner } from "@masa-finance/masa-sdk";

export const pointsShow = async (address?: string) => {
  if (!isSigner(masa.config.signer)) {
    return;
  }

  address = address || (await masa.config.signer.getAddress());

  if (!masa.marketplace.isContractAvailable) {
    console.error(`Marketplace is not available on ${masa.config.networkName}`);
    return;
  }

  console.log(`${address}\n`);

  const balances =
    await masa.contracts.instances.DataPointsMulti.getUserBalances(address);

  balances.map((balance) => {
    console.log(balance.tokenName, balance.balance.toString());
  });
};
