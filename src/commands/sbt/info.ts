import { masa } from "../../helpers";

export const info = async (address: string) => {
  const { sbtContract } = await masa.contracts.sbt.connect(address);

  if (sbtContract) {
    console.log("Self Sovereign SBT Contract Information:\n");
    console.log(`Contract Name: '${await sbtContract.name()}'`);
    console.log(`Contract Symbol: '${await sbtContract.symbol()}'`);
    console.log(`Contract Address: '${sbtContract.address}'`);
    console.log(`Total SBTs: ${(await sbtContract.totalSupply()).toNumber()}`);
    console.log(`Network: '${masa.config.networkName}'`);
  } else {
    console.error(
      `Contract ${address} is not deployed to network: '${masa.config.networkName}'`
    );
  }
};
