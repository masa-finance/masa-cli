import { masa } from "../../helpers";
import { PaymentMethod } from "@masa-finance/masa-sdk";

export const prepareMint = async (
  paymentMethod: PaymentMethod,
  address: string,
  name: string,
  types: string,
  value: string,
  authorityAddress: string,
  signature: string
) => {
  const { prepareMint } = await masa.contracts.sbt.connect(address);
  const prepareMintResults = await prepareMint(
    paymentMethod,
    name,
    JSON.parse(types),
    JSON.parse(value),
    signature,
    authorityAddress
  );

  if (prepareMintResults) {
    const { price, paymentAddress } = prepareMintResults;
    console.log({ price, paymentAddress });
  }
};
