import { masa } from "../../helpers/masa";

export const burn = async (creditReportId: number) => {
  if (await masa.session.checkLogin()) {
    const identityContracts = await masa.contracts.loadIdentityContracts();

    const signer = await masa.config.provider?.getSigner();
    if (!signer) return;

    const address = await signer.getAddress();
    const identityId = await masa.identity.loadIdentity(address);

    if (!identityId) {
      return;
    }

    console.log(`Burning Credit Report with id ${creditReportId}!`);
    try {
      const tx = await identityContracts.SoulboundCreditReportContract.connect(
        signer
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
