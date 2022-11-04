import { masa } from "../../helpers/masa";

export const info = async () => {
  const identityContracts = await masa.contracts.loadIdentityContracts();

  console.log("Soulbound 2fa");
  console.log(`Contract Address: '${identityContracts.Soulbound2FA.address}'`);
  console.log(
    `Total 2fas: ${(
      await identityContracts.Soulbound2FA.totalSupply()
    ).toNumber()}`
  );
};
