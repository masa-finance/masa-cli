import { masa } from "../../helpers";

export const info = async (address: string) => {
  const { selfSovereignSBT } = await masa.contracts.sbt.connect(address);

  if (selfSovereignSBT) {
    console.log("Self Sovereign SBT Contract Information:\n");
    console.log(`Contract Name: '${await selfSovereignSBT.name()}'`);
    console.log(`Contract Symbol: '${await selfSovereignSBT.symbol()}'`);
    console.log(`Contract Address: '${selfSovereignSBT.address}'`);
    console.log(
      `Total SBTs: ${(await selfSovereignSBT.totalSupply()).toNumber()}`
    );
    console.log(`Network: '${masa.config.networkName}'`);
  } else {
    console.error("Contract not found!");
  }
};
