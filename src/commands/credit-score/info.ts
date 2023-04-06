import { masa } from "../../helpers";

export const info = async () => {
  if (masa.contracts.instances.SoulboundCreditScoreContract.hasAddress) {
    console.log("Soulbound Credit Score");
    console.log(
      `Contract Address: '${masa.contracts.instances.SoulboundCreditScoreContract.address}'`
    );
    console.log(
      `Total Credit Scores: ${(
        await masa.contracts.instances.SoulboundCreditScoreContract.totalSupply()
      ).toNumber()}`
    );
    console.log(`Network: '${masa.config.networkName}'`);
  } else {
    console.error(
      `Soulbound Credit Score is not deployed to network: '${masa.config.networkName}'`
    );
  }
};
