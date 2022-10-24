import { config } from "../utils/config";
import { masa } from "../helpers/masa";
import { version as cliVersion } from "../../package.json";

export const version = () => {
  const versions = masa.utils.version();
  console.log(
    `CLI: v${cliVersion} Contracts: v${versions.contractsVersion} SDK: v${versions.sdkVersion}`
  );
  console.log(
    `Arweave Endpoint: ${config.get("arweave-protocol")}://${config.get(
      "arweave-host"
    )}:${config.get("arweave-port")}`
  );
  console.log(`RPC Endpoint: ${config.get("rpc-url")}`);
  console.log(`Masa Endpoint: ${masa.config.apiUrl}`);
};
