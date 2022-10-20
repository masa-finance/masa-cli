import { checkLogin } from "../../helpers/check-login";
import { loadContracts } from "@masa-finance/tools";
import { provider, account } from "../../utils/ethers";
import { middlewareClient } from "../../utils/rest";
import { config } from "../../utils/storage";
import { ethers } from "ethers";

export const create = async (soulName: string, duration: number) => {
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

    if (!(await identityContracts.SoulNameContract.isAvailable(soulName))) {
      const cookie = config.get("cookie");

      console.log("Writing metadata");
      const storeMetadataResponse = await middlewareClient
        .post(
          `/storage/store`,
          {
            soulName: `${soulName}.soul`,
          },
          {
            headers: {
              cookie: [cookie],
            },
          }
        )
        .catch((err: any) => {
          console.error(err.message);
        });

      if (storeMetadataResponse) {
        const { data: storeMetadataData } = storeMetadataResponse;

        const metadataUrl = `ar://${storeMetadataData.metadataTransaction.id}`;
        console.log(metadataUrl);

        const prices =
          await identityContracts.SoulStoreContract.purchaseNameInfo(
            soulName,
            duration
          );

        const tx = await identityContracts.SoulStoreContract.connect(
          account
        ).purchaseName(
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
