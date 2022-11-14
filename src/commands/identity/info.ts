import { masa } from "../../helpers";

export const info = async () => {
  console.log("Soulbound Identity");
  console.log(
    `Contract Address: '${masa.contracts.identity.SoulboundIdentityContract.address}'`
  );
  console.log(
    `Total Identities: ${(
      await masa.contracts.identity.SoulboundIdentityContract.totalSupply()
    ).toNumber()}`
  );
};
