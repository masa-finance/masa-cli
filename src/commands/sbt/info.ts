import { masa } from "../../helpers";

export const info = async (address: string) => {
  const { sbtContract } = await masa.sbt.connect(address);

  if (sbtContract) {
    const supply = (await sbtContract.totalSupply()).toNumber();
    console.log("Self Sovereign SBT Contract Information:\n");
    console.log(`Network: '${masa.config.networkName}'`);
    console.log(`Contract Name: '${await sbtContract.name()}'`);
    console.log(`Contract Symbol: '${await sbtContract.symbol()}'`);
    if (supply > 0) {
      console.log(`Contract Token URI: '${await sbtContract.tokenURI(0)}'`);
    }
    console.log(`Contract Address: '${sbtContract.address}'`);
    console.log(`Total SBTs: ${supply}`);
  } else {
    console.error(
      `Contract ${address} is not deployed to network: '${masa.config.networkName}'`
    );
  }
};
