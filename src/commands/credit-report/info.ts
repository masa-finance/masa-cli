import { loadIdentityContracts } from "../../utils/ethers";

export const info = async () => {
  const identityContracts = await loadIdentityContracts();

  console.log("Soulbound Credit Report");
  console.log(
    `Contract Address: ${identityContracts.SoulboundCreditReportContract.address}`
  );
  console.log(
    `Total Credit Reports: ${(
      await identityContracts.SoulboundCreditReportContract.totalSupply()
    ).toNumber()}`
  );
};
