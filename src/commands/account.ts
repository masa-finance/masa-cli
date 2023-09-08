import { masa } from "../helpers";

export const account = async (address?: string) => {
  address = address || (await masa.config.signer.getAddress());
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
    console.dir({ balances }, { depth: null });
  }

  const precision = 8;
  if (balances) {
    // balances
    console.log("\nBalances:\n");

    for (const [symbol, balance] of Object.entries(balances)) {
      if (!isNaN(balance)) {
        console.log(
          `${symbol}: '${
            balance % 1 === 0 ? balance : balance.toFixed(precision)
          }'`,
        );
      }
    }
  }
};
