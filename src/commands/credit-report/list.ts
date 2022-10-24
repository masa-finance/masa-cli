import { masa } from "../../helpers/masa";

export const list = async (address?: string) => {
  if (await masa.session.checkLogin()) {
    const identityContracts = await masa.contracts.loadIdentityContracts();

    address = address || (await masa.config.wallet.getAddress());

    const identityId = await masa.identity.loadIdentity(address);
    if (!identityId) return;

    const creditReportBalance =
      await identityContracts.SoulboundCreditReportContract.balanceOf(address);

    if (creditReportBalance.toNumber() === 0) {
      console.log("No Credit Reports found");
    }

    for (
      let creditReportIndex = 0;
      creditReportBalance < creditReportBalance;
      creditReportIndex++
    ) {
      const tokenId =
        await identityContracts.SoulboundCreditReportContract.tokenOfOwnerByIndex(
          address,
          creditReportIndex
        );

      const tokenUri = masa.metadata.patchMetadataUrl(
        await identityContracts.SoulNameContract["tokenURI(uint256)"](tokenId)
      );

      const metadata = await masa.metadata.getMetadata(tokenUri);

      if (metadata) {
        console.log(`Metadata: ${JSON.stringify(metadata, null, 2)}`);
      }
    }
  } else {
    console.log("Not logged in please login first");
  }
};
