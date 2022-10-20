import { checkLogin } from "../../helpers/check-login";
import { loadContracts } from "@masa-finance/tools";
import { provider, account } from "../../utils/ethers";

export const burn = async () => {
  if (await checkLogin()) {
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

    console.log("Burning Identity");
    const tx = await identityContracts.SoulboundIdentityContract.connect(
      account
    ).burn(identityId);

    console.log("Waiting for the burn tx to finalize");
    await tx.wait();

    console.log(`Identity with id ${identityId} burned!`);
  } else {
    console.log("Not logged in please login first");
  }
};
