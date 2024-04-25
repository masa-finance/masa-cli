import { masa } from "../../helpers";

export const pointsInfo = async () => {
  if (!masa.marketplace.isContractAvailable) {
    console.error(`Marketplace is not available on ${masa.config.networkName}`);
    return;
  }

  const { getAllTokenIdMetadata } = masa.contracts.instances.DataPointsMulti;

  console.log(
    (await getAllTokenIdMetadata()).map(
      (metadata) =>
        `${metadata.tokenId.toString()} - ${metadata.metadata.name}`,
    ),
  );
};
