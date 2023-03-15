import {
  EnvironmentName,
  Masa,
  MasaArgs,
  NetworkName,
} from "@masa-finance/masa-sdk";
import { config } from "../utils/config";
import { providers, Wallet } from "ethers";

const provider = new providers.JsonRpcProvider(config.get("rpc-url") as string);

const wallet = new Wallet(config.get("private-key") as string, provider);

const masaArgs: MasaArgs = {
  cookie: config.get("cookie") as string,
  wallet,
  apiUrl: config.get("api-url") as string,
  environment: config.get("environment") as EnvironmentName,
  defaultNetwork: config.get("network") as NetworkName,
  verbose: config.get("verbose") as boolean,
  arweave: {
    host: config.get("arweave-host") as string,
    port: config.get("arweave-port") as number,
    protocol: config.get("arweave-protocol") as string,
    logging: config.get("arweave-logging") as boolean,
  },
};

export const reloadMasa = (overrideConfig: { verbose?: boolean }) => {
  masa = new Masa({ ...masaArgs, ...overrideConfig });
};

export let masa = new Masa(masaArgs);
