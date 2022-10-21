import { account as acc, provider } from "../utils/ethers";
import { ethers } from "ethers";
import { config } from "../utils/config";
import { MASA__factory } from "@masa-finance/masa-contracts-identity";
import { addresses } from "@masa-finance/tools";
import { masa } from "../helpers/masa";

export const account = async () => {
  const address = await acc.getAddress();

  // login status
  const isLoggedIn = await masa.session.checkLogin();
  console.log(`\nNetwork: ${config.get("network")}`);

  console.log(`Logged in: ${isLoggedIn}`);

  // identity id
  const identityId = await masa.identity.loadIdentity(address);

  console.log(`Identity ID: ${identityId}`);

  // balances
  console.log("\nBalances");

  // @ts-ignore
  const contractAddresses = addresses[config.get("network")];

  const [ethBalance, masaBalance, usdcBalance, wethBalance] = await Promise.all(
    [
      acc.getBalance(),
      MASA__factory.connect(contractAddresses.MASA, provider).balanceOf(
        address
      ),
      MASA__factory.connect(contractAddresses.USDC, provider).balanceOf(
        address
      ),
      MASA__factory.connect(contractAddresses.WETH, provider).balanceOf(
        address
      ),
    ]
  );

  console.log(`ETH: ${ethers.utils.formatEther(ethBalance)}`);
  console.log(`MASA: ${ethers.utils.formatEther(masaBalance)}`);
  console.log(`USDC: ${ethers.utils.formatEther(usdcBalance)}`);
  console.log(`WETH: ${ethers.utils.formatEther(wethBalance)}`);
};
