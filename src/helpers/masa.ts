import { EnvironmentName, Masa, NetworkName } from "@masa-finance/masa-sdk";
import { config } from "../utils/config";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  config.get("rpc-url") as string
);

const wallet = new ethers.Wallet(config.get("private-key") as string, provider);

export const masa = new Masa({
  cookie: config.get("cookie") as string,
  wallet,
  apiUrl: config.get("api-url") as string,
  environment: config.get("environment") as EnvironmentName,
  network: config.get("network") as NetworkName,
  arweave: {
    host: config.get("arweave-host") as string,
    port: config.get("arweave-port") as number,
    protocol: config.get("arweave-protocol") as string,
    logging: config.get("arweave-logging") as boolean,
  },
});
