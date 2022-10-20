import { version as contractsVersion } from "@masa-finance/masa-contracts-identity/package.json";
import { version as sdkVersion } from "@masa-finance/tools/package.json";
import { version as cliVersion } from "../../package.json";
import { config } from "../utils/storage";

export const version = async () => {
  console.log(
    `CLI: ${cliVersion} Contracts: ${contractsVersion} SDK: ${sdkVersion}`
  );
  console.log(
    `Arweave: ${config.get("arweave-protocol")}://${config.get(
      "arweave-host"
    )}:${config.get("arweave-port")}`
  );
  console.log(`RPC Endpoint: ${config.get("rpc-url")}`);
  console.log(`Masa Endpoint: ${config.get("api-url")}`);
};
