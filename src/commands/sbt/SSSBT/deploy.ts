import { masa, readLine } from "../../../helpers";

export const deploySSSBT = async () => {
  console.log("Deploying SSSBT contract\n");

  const name = await readLine("Enter the name of the SBT: ");
  const symbol = await readLine("Enter the ticker of the SBT: ");
  const baseTokenUri = await readLine("Enter the URL for the metadata image: ");
  const authorityAddress = await readLine(
    `Authority address (leave empty to use: '${await masa.config.signer.getAddress()}'): `
  );
  const adminAddress = await readLine(
    `Admin address (leave empty to use: '${await masa.config.signer.getAddress()}'): `
  );
  const limit = await readLine(
    "Enter mint limit (0 = no limit, default = 1): "
  );

  const address = await masa.sssbt.deploy(
    name,
    symbol,
    baseTokenUri,
    limit ? parseInt(limit) : undefined,
    authorityAddress,
    adminAddress
  );

  if (!address) {
    console.error("Deployment failed!");
  }
};