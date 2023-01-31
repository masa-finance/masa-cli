import { masa } from "../../helpers";

export const info = async () => {
  console.log("Soulbound Identity");
  console.log(
    `Contract Address: '${masa.contracts.instances.SoulboundIdentityContract.address}'`
  );
  console.log(
    `Total Identities: ${(
      await masa.contracts.instances.SoulboundIdentityContract.totalSupply()
    ).toNumber()}`
  );
  console.log(`Network: '${masa.config.network}'`);
};
