import { masa } from "../../helpers";
import { BigNumber, TypedDataField } from "ethers";

export const sign = async (
  address: string,
  name: string,
  types: Record<string, Array<TypedDataField>>,
  value: Record<string, string | BigNumber | number>
) => {
  const { sign } = await masa.contracts.sbt(address);
  const signResult = await sign(name, types, value);

  /*
    types: {
      MintGreen: [
        { name: "to", type: "address" },
        { name: "authorityAddress", type: "address" },
        { name: "signatureDate", type: "uint256" },
      ],
    },
   */

  if (signResult) {
    console.log(signResult.signature, signResult.authorityAddress);
  }
};
