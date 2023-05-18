import { masa } from "../../helpers";
import { ReferenceSBTAuthority, ReferenceSBTAuthority__factory } from "@masa-finance/masa-contracts-identity";

export const mintASBT = async (contractAddress: string, receiver: string) => {
  const { sbtContract } = await masa.sbt.connect<ReferenceSBTAuthority>(
    contractAddress,
    ReferenceSBTAuthority__factory
  );

  if (sbtContract) {
    await masa.sbt.ASBT.mint(sbtContract, receiver);
  }
};
