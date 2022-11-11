import { masa } from "../../helpers";

export const info = async () => {
  const identityContracts = await masa.contracts.loadIdentityContracts();

  console.log("Soul Name");
  console.log(
    `Contract Address: '${identityContracts.SoulNameContract.address}'`
  );
  console.log(
    `Total Soul Names: ${(
      await identityContracts.SoulNameContract.totalSupply()
    ).toNumber()}`
  );
};
