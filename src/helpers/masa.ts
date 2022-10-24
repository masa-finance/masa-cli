import { Masa } from "@masa-finance/masa-sdk";
import { config } from "../utils/config";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(
  config.get("rpc-url") as string
);

new ethers.Wallet(config.get("private-key") as string).connect(provider);

export const masa = new Masa({
  provider,
  apiUrl: config.get("api-url") as string,
  environment: config.get("environment") as string,
  arweave: {
    host: config.get("arweave-host") as string,
    port: config.get("arweave-host") as number,
    protocol: config.get("arweave-host") as string,
    logging: config.get("arweave-host") as boolean,
  },
});

masa.config.cookie = config.get("cookie") as string;
