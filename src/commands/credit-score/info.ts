import { masa } from "../../helpers/masa";

export const info = async () => {
  const identityContracts = await masa.contracts.loadIdentityContracts();

  console.log("Soulbound Credit Report");
  console.log(
    `Contract Address: '${identityContracts.SoulboundCreditReportContract.address}'`
  );
  console.log(
    `Total Credit Reports: ${(
      await identityContracts.SoulboundCreditReportContract.totalSupply()
    ).toNumber()}`
  );
};
