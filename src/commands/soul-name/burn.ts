import { masa } from "../../helpers/masa";

export const burn = async (soulName: string) => {
  if (await masa.session.checkLogin()) {
    if (soulName.endsWith(".soul")) {
      soulName = soulName.replace(".soul", "");
    }

    const identityContracts = await masa.contracts.loadIdentityContracts();

    const address = await masa.config.wallet.getAddress();
    const identityId = await masa.identity.loadIdentity(address);

    if (!identityId) return;

    const nameData = await identityContracts.SoulNameContract.nameData(
      soulName
    );

    console.log(`Burning ${soulName}.soul with id ${nameData.tokenId}!`);
    try {
      const tx = await identityContracts.SoulNameContract.connect(
        masa.config.wallet
      ).burn(nameData.tokenId);

      console.log("Waiting for the burn tx to finalize");
      await tx.wait();

      console.log(`${soulName}.soul with id ${nameData.tokenId} burned!`);
    } catch (err: any) {
      console.error(`Burning of Soul Name Failed! ${err.message}`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
