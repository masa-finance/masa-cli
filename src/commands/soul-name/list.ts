import { account, provider } from "../../utils/ethers";
import { arweave } from "../../utils/arweave";
import Masa from "../../helpers/sdk/sdk";

export const list = async (address?: string) => {
  const masa = new Masa({ provider });

  if (await masa.session.checkLogin()) {
    const identityContracts = await masa.contracts.loadIdentityContracts();

    address = address || (await account.getAddress());

    const identityId = await masa.identity.loadIdentity(address);

    if (!identityId) return;

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
          address,
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
  } else {
    console.log("Not logged in please login first");
  }
};
