import { masa } from "../../helpers/masa";

export const show = async (address?: string) => {
  if (await masa.session.checkLogin()) {
    address = address || (await masa.config.wallet.getAddress());

    const identityId = await masa.identity.loadIdentity(address);
    if (!identityId) return;

    const identityContracts = await masa.contracts.loadIdentityContracts();

    const tokenUri = masa.metadata.patchMetadataUrl(
      await identityContracts.SoulboundIdentityContract["tokenURI(uint256)"](
        identityId
      )
    );
    console.log(`Identity Metadata URL: ${tokenUri}`);

    const metadata = await masa.metadata.getMetadata(tokenUri);

    if (metadata) {
      console.log(`Metadata: ${JSON.stringify(metadata, null, 2)}`);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
