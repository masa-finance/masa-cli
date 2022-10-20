import { checkLogin } from "../../helpers/check-login";
import { loadContracts } from "@masa-finance/tools";
import { provider, account } from "../../utils/ethers";
import { middlewareClient } from "../../utils/rest";
import { config } from "../../utils/storage";

export const patchMetadataUrl = (tokeUri: string) => {
  const apiUrl = config.get("api-url");
  const env = config.get("environment");

  if (tokeUri.indexOf("beta") > -1) {
    if (apiUrl.indexOf("localhost") > -1 || apiUrl.indexOf("127.0.0.1") > -1) {
      return tokeUri.replace("https://beta.metadata.masa.finance/", apiUrl);
    } else {
      return tokeUri.replace("beta", env);
    }
  }
  return tokeUri;
};

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
      console.log(identityId.toNumber());

      const tokenUri = patchMetadataUrl(
        await identityContracts.SoulboundIdentityContract["tokenURI(uint256)"](
          identityId
        )
      );
      console.log(tokenUri);

      const cookie = config.get("cookie");

      const metadataResponse = await middlewareClient.get(tokenUri, {
        headers: {
          cookie: [cookie],
        },
      });
      if (metadataResponse) {
        const { data: metadata } = metadataResponse;

        console.log(metadata);
      }
    }
  } else {
    console.log("Not logged in please login first");
  }
};
