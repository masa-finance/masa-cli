import { masa } from "../../helpers";

export const info = async () => {
  console.log("Soulbound Green");
  console.log(
    `Contract Address: '${masa.contracts.instances.Soulbound2FAContract.address}'`
  );
  console.log(
    `Total Greens: ${(
      await masa.contracts.instances.Soulbound2FAContract.totalSupply()
    ).toNumber()}`
  );
};
