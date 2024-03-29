import { masa } from "../../helpers";

export const info = async (address: string) => {
  const { contract } = await masa.sbt.connect(address);

  if (contract) {
    const supply = (await contract.totalSupply()).toNumber();
    console.log("Soulbound Token Contract Information:\n");
    console.log(`Network: '${masa.config.networkName}'`);
    console.log(`Contract Name: '${await contract.name()}'`);
    console.log(`Contract Symbol: '${await contract.symbol()}'`);
    if (supply > 0) {
      try {
        console.log(
          `Contract Token URI: '${await contract.tokenURI(supply - 1)}'`,
        );
      } catch {
        // ignore
      }
    }
    console.log(`Contract Address: '${contract.address}'`);
    if (masa.config.verbose) {
      try {
        console.log(`Contract Swap Router: '${await contract.swapRouter()}'`);
      } catch {
        // ignore
      }
    }

    console.log(`Total SBTs: ${supply}`);
  } else {
    console.error(
      `Contract ${address} is not deployed to network: '${masa.config.networkName}'`,
    );
  }
};
