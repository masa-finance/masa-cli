import { ethers } from "ethers";
import { config } from "../utils/config";
import { masa } from "../helpers/masa";

export const account = async () => {
  const address = await masa.config.wallet.getAddress();

  // login status
  const isLoggedIn = await masa.session.checkLogin();
  console.log(`\nNetwork: ${config.get("network")}`);

  console.log(`Logged in: ${isLoggedIn}`);

  // identity id
  const identityId = await masa.identity.loadIdentity(address);

  console.log(`Identity ID: ${identityId}`);

  // balances
  console.log("\nBalances");

  const balances = await masa.account.getBalances(address);

  if (balances) {
    console.log(`ETH: ${ethers.utils.formatEther(balances.ethBalance)}`);
    console.log(`MASA: ${ethers.utils.formatEther(balances.masaBalance)}`);
    console.log(`USDC: ${ethers.utils.formatEther(balances.usdcBalance)}`);
    console.log(`WETH: ${ethers.utils.formatEther(balances.wethBalance)}`);
  }
};
