import { checkLogin } from "../../helpers/check-login";
import { account, loadIdentityContracts } from "../../utils/ethers";

export const burn = async () => {
  if (await checkLogin()) {
    const identityContracts = await loadIdentityContracts();

    let identityId;
    try {
      identityId =
        await identityContracts.SoulboundIdentityContract.tokenOfOwner(
          await account.getAddress()
        );
    } catch {
      // ignore
    }

    if (!identityId) {
      console.error("No identity! Create one first.");
      return;
    }

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
