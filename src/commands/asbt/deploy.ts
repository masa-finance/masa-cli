import { masa, readLine } from "../../helpers";

export const deployASBT = async () => {
  console.log("Deploying ASBT contract\n");

  const name = await readLine("Enter the name of the SBT: ");
  const symbol = await readLine("Enter the ticker of the SBT: ");
  const baseTokenUri = await readLine("Enter the URL for the metadata image: ");
  const adminAddress = await readLine(
    `Admin address (leave empty to use: '${await masa.config.wallet.getAddress()}'): `
  );

  const address = await masa.sbt.deployASBT(
    name,
    symbol,
    baseTokenUri,
    adminAddress
  );

  if (!address) {
    console.error("Deployment failed!");
  }
};
