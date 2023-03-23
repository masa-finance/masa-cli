import { masa } from "../../helpers";

export const info = async () => {
  console.log("Soul Name");
  console.log(
    `Contract Address: '${masa.contracts.instances.SoulNameContract.address}'`
  );
  console.log(
    `Extension: '${await masa.contracts.instances.SoulNameContract.extension()}'`
  );
  console.log(
    `Total Soul Names: ${(
      await masa.contracts.instances.SoulNameContract.totalSupply()
    ).toNumber()}`
  );
  console.log(`Network: '${masa.config.networkName}'`);
};
