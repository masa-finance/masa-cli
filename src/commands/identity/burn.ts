import { account } from "../../utils/ethers";
import { masa } from "../../helpers/masa";

export const burn = async () => {
  if (await masa.session.checkLogin()) {
    const identityContracts = await masa.contracts.loadIdentityContracts();

    const address = await account.getAddress();
    const identityId = await masa.identity.loadIdentity(address);

    if (!identityId) return;

    console.log("Burning Identity");
    try {
      const tx = await identityContracts.SoulboundIdentityContract.connect(
        account
      ).burn(identityId);

      console.log("Waiting for the burn tx to finalize");
      await tx.wait();

      console.log(`Identity with id ${identityId} burned!`);
    } catch (err: any) {
      console.error(`Burning of Identity Failed! ${err.message}`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
