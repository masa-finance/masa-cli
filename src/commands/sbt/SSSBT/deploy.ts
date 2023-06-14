import { masa, readLine, verifyContract } from "../../../helpers";
import fs from "fs";

export const deploySSSBT = async (etherscanKey?: string) => {
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

  const deployResult = await masa.sssbt.deploy(
    name,
    symbol,
    baseTokenUri,
    limit ? parseInt(limit) : undefined,
    authorityAddress,
    adminAddress
  );

  if (
    deployResult &&
    etherscanKey &&
    masa.config.network?.blockExplorerApiUrls?.[0]
  ) {
    const ReferenceSBTAuthority = fs
      .readFileSync(
        require.resolve(
          // todo add flattened version here
          "@masa-finance/masa-contracts-identity/contracts/reference/ReferenceSBTSelfSovereign.sol"
        )
      )
      .toString("utf8");

    await verifyContract(
      masa.config.network?.blockExplorerApiUrls?.[0],
      etherscanKey,
      deployResult.address,
      name,
      deployResult.abiEncodedConstructorArguments,
      ReferenceSBTAuthority
    );
  } else {
    console.error("Deployment failed!");
  }
};
