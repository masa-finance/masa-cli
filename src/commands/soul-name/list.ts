import { account, provider } from "../../utils/ethers";
import { arweave } from "../../utils/arweave";
import Masa from "../../helpers/sdk/sdk";
import { masa } from "../../helpers/masa";
import { BigNumber } from "ethers";

const loadSoulNamesFromIdentity = async (identityId: BigNumber) => {
  const soulNameDetails = [];

  const identityContracts = await masa.contracts.loadIdentityContracts();

  const address = await identityContracts.SoulboundIdentityContract[
    "ownerOf(uint256)"
  ](identityId);
  const soulNames = await identityContracts.SoulNameContract[
    "getSoulNames(uint256)"
  ](identityId);

  // todo parallelize this
  for (const nameIndex in soulNames) {
    const tokenDetails = await identityContracts.SoulNameContract.getTokenData(
      soulNames[nameIndex]
    );

    const tokenId =
      // todo this is bad style, we need to get the tokenId from the soul name somehow on getTokenData
      await identityContracts.SoulNameContract.tokenOfOwnerByIndex(
        address,
        nameIndex
      );

    const tokenUri = await identityContracts.SoulNameContract.tokenURI(tokenId);

    let metadata;
    try {
      const metadataResponse = await arweave.transactions
        .getData(tokenUri.replace("ar://", ""), {
          decode: true,
          string: true,
        })
        .catch(() => {
          // ignore
        });

      metadata = JSON.parse(metadataResponse as string);
    } catch {
      // ignore
    }

    soulNameDetails.push({
      index: nameIndex,
      tokenId,
      tokenUri,
      tokenDetails,
      metadata,
    });
  }

  return soulNameDetails;
};

export const list = async (address?: string) => {
  const masa = new Masa({ provider });

  if (await masa.session.checkLogin()) {
    address = address || (await account.getAddress());

    // load identity
    const identityId = await masa.identity.loadIdentity(address);
    if (!identityId) return;

    const soulNames = await loadSoulNamesFromIdentity(identityId);

    for (const soulName of soulNames) {
      console.log(`\nToken: ${parseInt(soulName.index) + 1}`);
      console.log(`Name: ${soulName.tokenDetails.sbtName}`);
      console.log(`Token ID: ${soulName.tokenId.toNumber()}`);
      console.log(
        `Identity ID: ${soulName.tokenDetails.identityId.toNumber()}`
      );
      console.log(`Active: ${soulName.tokenDetails.active}`);
      console.log(`Metadata Uri: ${soulName.tokenUri}`);
      if (soulName.metadata)
        console.log(`Metadata: ${JSON.stringify(soulName.metadata, null, 2)}`);

      console.log(
        `Expiry Date: ${new Date(
          soulName.tokenDetails.expirationDate.toNumber() * 1000
        ).toUTCString()}`
      );
    }
  } else {
    console.log("Not logged in please login first");
  }
};
