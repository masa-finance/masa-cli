import { checkLogin } from "../../helpers/check-login";
import { account, loadIdentityContracts } from "../../utils/ethers";

export const burn = async (soulName: string) => {
  if (await checkLogin()) {
    if (soulName.endsWith(".soul")) {
      soulName = soulName.replace(".soul", "");
    }

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

    const nameData = await identityContracts.SoulNameContract.nameData(
      soulName
    );

    console.log(`Burning ${soulName}.soul with id ${nameData.tokenId}!`);
    try {
      const tx = await identityContracts.SoulNameContract.connect(account).burn(
        nameData.tokenId
      );

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
