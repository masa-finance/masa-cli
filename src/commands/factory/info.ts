import { masa } from "../../helpers";

export const info = async (address: string) => {
  const { selfSovereignSBT } = await masa.contracts.factory(address);

  if (selfSovereignSBT) {
    console.log("Self Sovereign SBT\n");
    console.log(`Contract Name: '${await selfSovereignSBT.name()}'`);
    console.log(`Contract Address: '${selfSovereignSBT.address}'`);
    console.log(
      `Total SBTs: ${(await selfSovereignSBT.totalSupply()).toNumber()}`
    );
    console.log(`Network: '${masa.config.network}'`);
  } else {
    console.error("Contract not found!");
  }
};
