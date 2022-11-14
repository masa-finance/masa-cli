import { masa } from "../../helpers";

export const info = async () => {
  console.log("Soulbound Credit Report");
  console.log(
    `Contract Address: '${masa.contracts.identity.SoulboundCreditReportContract.address}'`
  );
  console.log(
    `Total Credit Reports: ${(
      await masa.contracts.identity.SoulboundCreditReportContract.totalSupply()
    ).toNumber()}`
  );
};
