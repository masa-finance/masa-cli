import { checkLogin } from "../../helpers/check-login";
import { account, loadIdentityContracts } from "../../utils/ethers";
import { middlewareClient } from "../../utils/client";
import { config } from "../../utils/config";

export const create = async () => {
  if (await checkLogin()) {
    const identityContracts = await loadIdentityContracts();

    const address = await account.getAddress();
    let identityId;

    try {
      identityId =
        await identityContracts.SoulboundIdentityContract.tokenOfOwner(address);
    } catch {
      // ignore
    }

    if (!identityId) {
      console.error("No identity! Create one first.");
      return;
    }

    // todo make something cooler here
    const msg = `${address}`;

    console.log(`Signing '${msg}'`);

    // 1. creat signature
    const signature = await account.signMessage(msg);

    // 2. mint credit report
    const cookie = config.get("cookie") as string;

    console.log("\nCreating Credit Report");
    const storeMetadataResponse = await middlewareClient
      .post(
        `/contracts/credit-score/mint`,
        {
          address,
          signature,
        },
        {
          headers: {
            cookie: [cookie],
          },
        }
      )
      .catch((err: any) => {
        console.error(err.message);
      });

    if (storeMetadataResponse) {
      const {
        data: { success, message },
      } = storeMetadataResponse;

      if (!success) {
        console.error("Creating Credit Report failed!");
      }

      console.log(message);
    }
  } else {
    console.log("Not logged in please login first");
  }
};
