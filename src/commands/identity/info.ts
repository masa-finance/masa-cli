import { masa } from "../../helpers/masa";

export const info = async () => {
  const identityContracts = await masa.contracts.loadIdentityContracts();

  console.log("Soulbound Identity");
  console.log(
    `Contract Address: '${identityContracts.SoulboundIdentityContract.address}'`
  );
  console.log(
    `Total Identities: ${(
      await identityContracts.SoulboundIdentityContract.totalSupply()
    ).toNumber()}`
  );
};
