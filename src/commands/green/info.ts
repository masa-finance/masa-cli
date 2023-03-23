import { masa } from "../../helpers";

export const info = async () => {
  console.log("Soulbound Green");
  console.log(
    `Contract Address: '${masa.contracts.instances.SoulboundGreenContract.address}'`
  );
  console.log(
    `Total Greens: ${(
      await masa.contracts.instances.SoulboundGreenContract.totalSupply()
    ).toNumber()}`
  );
  console.log(`Network: '${masa.config.networkName}'`);
};
