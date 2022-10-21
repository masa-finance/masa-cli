import { loadIdentityContracts } from "../../utils/ethers";

export const info = async () => {
  const identityContracts = await loadIdentityContracts();

  console.log("Soulbound Identity");
  console.log(
    `Contract Address: ${identityContracts.SoulboundIdentityContract.address}`
  );
  console.log(
    `Total Identities: ${(
      await identityContracts.SoulboundIdentityContract.totalSupply()
    ).toNumber()}`
  );
};
