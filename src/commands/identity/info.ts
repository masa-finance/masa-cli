import { masa } from "../../helpers";

export const info = async () => {
  if (masa.contracts.instances.SoulboundIdentityContract.hasAddress) {
    console.log("Soulbound Identity");
    console.log(
      `Contract Address: '${masa.contracts.instances.SoulboundIdentityContract.address}'`
    );
    console.log(
      `Total Identities: ${(
        await masa.contracts.instances.SoulboundIdentityContract.totalSupply()
      ).toNumber()}`
    );
    console.log(`Network: '${masa.config.networkName}'`);
  } else {
    console.error(
      `Soulbound Identity is not deployed to network: '${masa.config.networkName}'`
    );
  }
};
