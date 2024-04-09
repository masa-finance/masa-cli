import { masa } from "../../helpers";

export const info = async () => {
  if (masa.green.isContractAvailable) {
    console.log("Soulbound Green");
    console.log(
      `Contract Address: '${masa.contracts.instances.SoulboundGreenContract.address}'`,
    );
    console.log(
      `Total Greens: ${(
        await masa.contracts.instances.SoulboundGreenContract.totalSupply()
      ).toNumber()}`,
    );
    console.log(`Network: '${masa.config.networkName}'`);
  } else {
    console.error(
      `Soulbound Green is not deployed to network: '${masa.config.networkName}'`,
    );
  }
};
