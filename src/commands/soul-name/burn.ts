import { checkLogin } from "../../helpers/check-login";
import { loadContracts } from "@masa-finance/tools";
import { provider, account } from "../../utils/ethers";

export const burn = async (soulName: string) => {
  if (await checkLogin()) {
    if (soulName.endsWith(".soul")) {
      soulName = soulName.replace(".soul", "");
    }

    const identityContracts = await loadContracts({
      provider,
      network: "goerli",
    });

    let identityId;
    try {
      identityId =
        await identityContracts.SoulboundIdentityContract.tokenOfOwner(
          await account.getAddress()
        );
    } catch {}

    if (!identityId) {
      console.error("No identity! Create one first.");
      return;
    }

    const nameData = await identityContracts.SoulNameContract.nameData(
      soulName
    );

    console.log(`Burning ${soulName}.soul with id ${nameData.tokenId}!`);
    const tx = await identityContracts.SoulNameContract.connect(account).burn(
      nameData.tokenId
    );

    console.log("Waiting for the burn tx to finalize");
    await tx.wait();

    console.log(`${soulName}.soul with id ${nameData.tokenId} burned!`);
  } else {
    console.log("Not logged in please login first");
  }
};
