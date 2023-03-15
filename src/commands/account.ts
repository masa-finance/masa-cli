import { ethers } from "ethers";
import { masa } from "../helpers";

export const account = async () => {
  const address = await masa.config.wallet.getAddress();
  console.log(`Address: '${address}'\n`);

  // login status
  const isLoggedIn = await masa.session.checkLogin();
  console.log(`Logged in: ${isLoggedIn}`);

  // identity id
  const { identityId } = await masa.identity.load(address);
  if (identityId) {
    console.log(`Identity ID: '${identityId}'`);
  }

  const balances = await masa.account.getBalances(address);

  if (masa.config.verbose) {
    console.log({ balances });
  }

  const precision = 8;
  if (balances) {
    // balances
    console.log("\nBalances");
    console.log(
      `ETH '${parseFloat(ethers.utils.formatEther(balances.ethBalance)).toFixed(
        precision
      )}'`
    );
    console.log(
      `MASA '${parseFloat(
        ethers.utils.formatEther(balances.masaBalance)
      ).toFixed(precision)}'`
    );
    console.log(
      `USDC '${parseFloat(
        ethers.utils.formatEther(balances.usdcBalance)
      ).toFixed(precision)}'`
    );
    console.log(
      `WETH '${parseFloat(
        ethers.utils.formatEther(balances.wethBalance)
      ).toFixed(precision)}'`
    );

    console.log(`Identity: ${balances.identityBalance.toNumber()}`);
    console.log(`Soul Names: ${balances.soulNameBalance.toNumber()}`);
    console.log(
      `Credit Scores: ${balances.soulboundCreditScoreBalance.toNumber()}`
    );
    console.log(`Greens: ${balances.soulboundGreenBalance.toNumber()}`);
  }
};
