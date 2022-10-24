import { ethers } from "ethers";
import { masa } from "../../helpers/masa";

export const create = async (soulName: string, duration: number) => {
  if (await masa.session.checkLogin()) {
    if (soulName.endsWith(".soul")) {
      soulName = soulName.replace(".soul", "");
    }
    const signer = await masa.config.provider?.getSigner();
    if (!signer) return;

    const address = await signer.getAddress();

    const identityId = await masa.identity.loadIdentity(address);

    if (identityId) {
      console.error("Identity already created!");
      return;
    }

    const identityContracts = await masa.contracts.loadIdentityContracts();

    if (!(await identityContracts.SoulNameContract.isAvailable(soulName))) {
      console.log("Writing metadata");
      const storeMetadataData = await masa.metadata.metadataStore(soulName);

      if (storeMetadataData) {
        const metadataUrl = `ar://${storeMetadataData.metadataTransaction.id}`;
        console.log(metadataUrl);

        const prices =
          await identityContracts.SoulStoreContract.purchaseNameInfo(
            soulName,
            duration
          );

        const tx = await identityContracts.SoulStoreContract.connect(
          signer
        ).purchaseIdentityAndName(
          // todo change payment method
          ethers.constants.AddressZero,
          soulName,
          duration,
          metadataUrl,
          { value: prices.priceInETH }
        );

        console.log("Waiting for transaction to finalize");

        await tx.wait();
      }
    } else {
      console.error(`Soulname ${soulName}.soul already taken.`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
