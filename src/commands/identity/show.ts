import { account } from "../../utils/ethers";
import { patchMetadataUrl } from "../../helpers/patch-metadata-url";
import { masa } from "../../helpers/masa";
import { getMetadata } from "../../helpers/sdk/helpers/client"

export const show = async (address?: string) => {
  if (await masa.session.checkLogin()) {
    const identityContracts = await masa.contracts.loadIdentityContracts();

    address = address || (await account.getAddress());
    const identityId = await masa.identity.loadIdentity(address);

    if (!identityId) return;

    const tokenUri = patchMetadataUrl(
      await identityContracts.SoulboundIdentityContract["tokenURI(uint256)"](
        identityId
      )
    );
    console.log(`Identity Metadata URL: ${tokenUri}`);

    const metadata = await getMetadata(tokenUri);

    if (metadata) {
      console.log(`Metadata: ${JSON.stringify(metadata, null, 2)}`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
