import { masa } from "../../helpers";

export const sign = async (
  address: string,
  name: string,
  types: string,
  value: string
) => {
  const { sign } = await masa.contracts.sbt.connect(address);
  const signResult = await sign(name, JSON.parse(types), JSON.parse(value));

  if (signResult) {
    const { signature, authorityAddress } = signResult;
    console.log(signature, authorityAddress);
  }
};
