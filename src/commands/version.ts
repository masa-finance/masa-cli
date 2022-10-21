import { config } from "../utils/config";
import { masa } from "../helpers/masa";

export const version = () => {
  const versions = masa.utils.version();
  console.log(
    `CLI: v${versions.cliVersion} Contracts: v${versions.contractsVersion} SDK: v${versions.sdkVersion}`
  );
  console.log(
    `Arweave Endpoint: ${config.get("arweave-protocol")}://${config.get(
      "arweave-host"
    )}:${config.get("arweave-port")}`
  );
  console.log(`RPC Endpoint: ${config.get("rpc-url")}`);
  console.log(`Masa Endpoint: ${config.get("api-url")}`);
};
