import { checkLogin } from "../../helpers/check-login";
import { loadContracts } from "@masa-finance/tools";
import { provider, account } from "../../utils/ethers";
import Arweave from "arweave";
import { config } from "../../utils/storage";

const arweave = Arweave.init({
  host: config.get("arweave-host"),
  port: config.get("arweave-port"),
  protocol: config.get("arweave-protocol"),
  logging: config.get("arweave-logging"),
});

export const list = async () => {
  if (await checkLogin()) {
    const identityContracts = await loadContracts({
      provider,
      network: "goerli",
    });

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

      for (let nameIndex in soulNames) {
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
            .catch(() => {});

          metadata = JSON.parse(metadataResponse as string);
        } catch {}

        console.log("\nToken:", parseInt(nameIndex) + 1);
        console.log("Name:", tokenDetails.sbtName);
        console.log("Token ID:", tokenId.toNumber());
        console.log("Identity ID:", tokenDetails.identityId.toNumber());
        console.log("Active:", tokenDetails.active);
        console.log("Metadata Uri:", tokenUri);
        if (metadata) console.log("Metadata", metadata);

        console.log(
          "Expiry Date:",
          new Date(tokenDetails.expirationDate.toNumber() * 1000).toUTCString()
        );
      }
    }
  } else {
    console.log("Not logged in please login first");
  }
};
