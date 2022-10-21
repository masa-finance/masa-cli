import { checkLogin } from "../../helpers/check-login";
import { account, loadIdentityContracts } from "../../utils/ethers";
import { arweave } from "../../utils/arweave";

export const list = async () => {
  if (await checkLogin()) {
    const identityContracts = await loadIdentityContracts();

    let identityId;

    try {
      identityId =
        await identityContracts.SoulboundIdentityContract.tokenOfOwner(
          await account.getAddress()
        );
    } catch {
      console.log("No identity please create one");
    }

    if (identityId) {
      const soulNames = await identityContracts.SoulNameContract[
        "getSoulNames(uint256)"
      ](identityId);

      for (const nameIndex in soulNames) {
        const tokenDetails =
          await identityContracts.SoulNameContract.getTokenData(
            soulNames[nameIndex]
          );

        const tokenId =
          await identityContracts.SoulNameContract.tokenOfOwnerByIndex(
            await account.getAddress(),
            nameIndex
          );

        const tokenUri = await identityContracts.SoulNameContract.tokenURI(
          tokenId
        );

        let metadata;
        try {
          const metadataResponse = await arweave.transactions
            .getData(tokenUri.replace("ar://", ""), {
              decode: true,
              string: true,
            })
            .catch();

          metadata = JSON.parse(metadataResponse as string);
        } catch {
          // ignore
        }

        console.log(`\nToken: ${parseInt(nameIndex) + 1}`);
        console.log(`Name: ${tokenDetails.sbtName}`);
        console.log(`Token ID: ${tokenId.toNumber()}`);
        console.log(`Identity ID: ${tokenDetails.identityId.toNumber()}`);
        console.log(`Active: ${tokenDetails.active}`);
        console.log(`Metadata Uri: ${tokenUri}`);
        if (metadata)
          console.log(`Metadata: ${JSON.stringify(metadata, null, 2)}`);

        console.log(
          `Expiry Date: ${new Date(
            tokenDetails.expirationDate.toNumber() * 1000
          ).toUTCString()}`
        );
      }
    }
  } else {
    console.log("Not logged in please login first");
  }
};
