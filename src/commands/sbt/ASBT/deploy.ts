import { masa, readLine, verifyContract } from "../../../helpers";
import fs from "fs";
import { isSigner } from "@masa-finance/masa-sdk";

const ReferenceSBTAuthorityPath = require.resolve(
  "@masa-finance/masa-contracts-identity/contracts/reference/ReferenceSBTAuthorityFlattened.sol",
);

export const deployASBT = async (etherscanKey?: string) => {
  if (!isSigner(masa.config.signer)) {
    console.error(`Unable to deploy to ${masa.config.networkName}!`);
    return;
  }

  console.log("Deploying ASBT contract\n");

  const name = await readLine("Enter the name of the SBT: ");
  const symbol = await readLine("Enter the ticker of the SBT: ");
  const baseTokenUri = await readLine("Enter the URL for the metadata image: ");
  const adminAddress = await readLine(
    `Admin address (leave empty to use: '${await masa.config.signer.getAddress()}'): `,
  );
  const limit = await readLine(
    "Enter mint limit (0 = no limit, default = 1): ",
  );

  const deployResult = await masa.asbt.deploy({
    name,
    symbol,
    baseTokenUri,
    limit: limit ? parseInt(limit) : undefined,
    adminAddress,
  });

  if (!deployResult) {
    console.error("ASBT Deployment failed!");
  } else if (etherscanKey && masa.config.network?.blockExplorerApiUrls?.[0]) {
    const ReferenceSBTAuthority = fs
      .readFileSync(ReferenceSBTAuthorityPath)
      .toString("utf8");

    const { address, abiEncodedConstructorArguments } = deployResult;

    await verifyContract(
      masa.config.network?.blockExplorerApiUrls?.[0],
      etherscanKey,
      address,
      name,
      abiEncodedConstructorArguments,
      ReferenceSBTAuthority,
    );
  }
};
