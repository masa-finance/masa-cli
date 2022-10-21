import { checkLogin } from "../../helpers/check-login";
import { account, loadIdentityContracts } from "../../utils/ethers";
import { middlewareClient } from "../../utils/client";
import { config } from "../../utils/config";
import { patchMetadataUrl } from "../../helpers/patch-metadata";

export const show = async () => {
  if (await checkLogin()) {
    const identityContracts = await loadIdentityContracts();

    const address = await account.getAddress();
    let identityId;

    try {
      identityId =
        await identityContracts.SoulboundIdentityContract.tokenOfOwner(address);
    } catch {
      console.log("No identity to show please create one");
    }

    if (identityId) {
      const tokenUri = patchMetadataUrl(
        await identityContracts.SoulboundIdentityContract["tokenURI(uint256)"](
          identityId
        )
      );
      console.log(`Identity Metadata URL: ${tokenUri}`);

      const cookie = config.get("cookie") as string;

      const metadataResponse = await middlewareClient.get(tokenUri, {
        headers: {
          cookie: [cookie],
        },
      });
      if (metadataResponse) {
        const { data: metadata } = metadataResponse;

        console.log(`Metadata: ${JSON.stringify(metadata, null, 2)}`);
      }
    }
  } else {
    console.log("Not logged in please login first");
  }
};
