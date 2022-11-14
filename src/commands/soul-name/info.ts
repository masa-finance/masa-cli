import { masa } from "../../helpers";

export const info = async () => {
  console.log("Soul Name");
  console.log(
    `Contract Address: '${masa.contracts.identity.SoulNameContract.address}'`
  );
  console.log(
    `Total Soul Names: ${(
      await masa.contracts.identity.SoulNameContract.totalSupply()
    ).toNumber()}`
  );
};
