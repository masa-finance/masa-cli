import { masa } from "../../helpers";
import { MasaSBTAuthority } from "@masa-finance/masa-contracts-identity";

export const mintASBT = async (contractAddress: string, receiver: string) => {
  const { sbtContract } = await masa.sbt.connect<MasaSBTAuthority>(
    contractAddress
  );

  if (sbtContract) {
    return await masa.sbt.ASBT.mint(sbtContract, receiver);
  }
};
