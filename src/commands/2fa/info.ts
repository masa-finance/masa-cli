import { masa } from "../../helpers";

export const info = async () => {
  const identityContracts = await masa.contracts.loadIdentityContracts();

  console.log("Soulbound 2FA");
  console.log(`Contract Address: '${identityContracts.Soulbound2FA.address}'`);
  console.log(
    `Total 2FAs: ${(
      await identityContracts.Soulbound2FA.totalSupply()
    ).toNumber()}`
  );
};
