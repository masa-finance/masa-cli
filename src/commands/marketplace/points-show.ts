import { masa } from "../../helpers";

export const pointsShow = async (address?: string) => {
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
