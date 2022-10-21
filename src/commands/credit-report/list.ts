import { checkLogin } from "../../helpers/check-login";
import { account, loadIdentityContracts } from "../../utils/ethers";
import { config } from "../../utils/config";
import { patchMetadataUrl } from "../../helpers/patch-metadata";
import { middlewareClient } from "../../utils/client";

export const list = async () => {
  if (await checkLogin()) {
    const identityContracts = await loadIdentityContracts();

    let identityId;

    const address = await account.getAddress();

    try {
      identityId =
        await identityContracts.SoulboundIdentityContract.tokenOfOwner(address);
    } catch {
      console.log("No identity please create one");
    }

    if (identityId) {
      const creditReportBalance =
        await identityContracts.SoulboundCreditReportContract.balanceOf(
          address
        );

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
    }
  } else {
    console.log("Not logged in please login first");
  }
};
