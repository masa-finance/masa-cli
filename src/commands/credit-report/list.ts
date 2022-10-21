import { account } from "../../utils/ethers";
import { masa } from "../../helpers/masa";
import { getMetadata } from "../../helpers/sdk/helpers/client";
import { patchMetadataUrl } from "../../helpers/sdk/helpers/patch-metadata-url";

export const list = async (address?: string) => {
  if (await masa.session.checkLogin()) {
    const identityContracts = await masa.contracts.loadIdentityContracts();

    address = address || (await account.getAddress());

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

      const tokenUri = patchMetadataUrl(
        await identityContracts.SoulNameContract.tokenURI(tokenId)
      );

      const metadata = await getMetadata(tokenUri);

      if (metadata) {
        console.log(`Metadata: ${JSON.stringify(metadata, null, 2)}`);
      }
    }
  } else {
    console.log("Not logged in please login first");
  }
};
