import { masa } from "../../helpers";

export const info = async () => {
  console.log("Soulbound Credit Score");
  console.log(
    `Contract Address: '${masa.contracts.identity.SoulboundCreditScoreContract.address}'`
  );
  console.log(
    `Total Credit Scores: ${(
      await masa.contracts.identity.SoulboundCreditScoreContract.totalSupply()
    ).toNumber()}`
  );
};
