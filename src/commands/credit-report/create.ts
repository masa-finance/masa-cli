import { masa } from "../../helpers/masa";

export const create = async () => {
  if (await masa.session.checkLogin()) {
    const address = await masa.config.wallet.getAddress();

    const identityId = await masa.identity.loadIdentity(address);
    if (!identityId) return;

    // todo do something cooler here
    const msg = `${address}`;

    console.log(`Signer Address: '${address}'`);
    console.log(`Signing: \n'${msg}'\n`);

    // 1. creat signature
    const signature = await masa.config.wallet.signMessage(msg);
    console.log(`Signature: '${signature}'`);

    // 2. mint credit report
    console.log("\nCreating Credit Report");
    const storeMetadataData = await masa.creditScore.creditScoreMint(
      address,
      signature
    );

    if (storeMetadataData) {
      const { success, message } = storeMetadataData;

      if (!success) {
        console.error("Creating Credit Report failed!");
      }

      console.log(message);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
