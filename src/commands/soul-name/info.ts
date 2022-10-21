import { loadIdentityContracts } from "../../utils/ethers";

export const info = async () => {
  const identityContracts = await loadIdentityContracts();

  console.log("Soul Name");
  console.log(
    `Contract Address: ${identityContracts.SoulNameContract.address}`
  );
  console.log(
    `Total Soul Names: ${(
      await identityContracts.SoulNameContract.totalSupply()
    ).toNumber()}`
  );
};
