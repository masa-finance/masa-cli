import { checkLogin } from "../../helpers/check-login";
import { loadContracts } from "@masa-finance/tools";
import { provider, account } from "../../utils/ethers";
import { middlewareClient } from "../../utils/rest";
import { config } from "../../utils/storage";
import { patchMetadataUrl } from "../../helpers/patch-metadata";

export const show = async () => {
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

      const cookie = config.get("cookie");

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
