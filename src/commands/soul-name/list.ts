import { masa } from "../../helpers/masa";

export const list = async (address?: string) => {
  if (await masa.session.checkLogin()) {
    address = address || (await masa.config.wallet.getAddress());

    // load identity
    const identityId = await masa.identity.loadIdentity(address);
    if (!identityId) return;

    const soulNames = await masa.soulNames.loadSoulNamesFromIdentity(
      identityId
    );

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
