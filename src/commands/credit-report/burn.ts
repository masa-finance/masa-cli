import { checkLogin } from "../../helpers/check-login";
import { account, loadIdentityContracts } from "../../utils/ethers";

export const burn = async (creditReportId: number) => {
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

    console.log(`Burning Credit Report with id ${creditReportId}!`);
    try {
      const tx = await identityContracts.SoulboundCreditReportContract.connect(
        account
      ).burn(creditReportId);

      console.log("Waiting for the burn tx to finalize");
      await tx.wait();

      console.log(`Credit Report with id ${creditReportId} burned!`);
    } catch (err: any) {
      console.error(`Burning of Credit Report Failed! ${err.message}`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
