import { masa } from "../../helpers";

export const info = async () => {
  console.log("Soulbound 2FA");
  console.log(
    `Contract Address: '${masa.contracts.identity.Soulbound2FA.address}'`
  );
  console.log(
    `Total 2FAs: ${(
      await masa.contracts.identity.Soulbound2FA.totalSupply()
    ).toNumber()}`
  );
};
