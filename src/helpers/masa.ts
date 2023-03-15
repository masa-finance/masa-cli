import {
  EnvironmentName,
  Masa,
  MasaArgs,
  NetworkName,
  SupportedNetworks,
} from "@masa-finance/masa-sdk";
import { config } from "../utils/config";
import { providers, Wallet } from "ethers";

const masaArgs: MasaArgs = {
  cookie: config.get("cookie") as string,
  wallet: new Wallet(
    config.get("private-key") as string,
    new providers.JsonRpcProvider(config.get("rpc-url") as string)
  ),
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

export const reloadMasa = (overrideConfig: {
  verbose?: boolean;
  defaultNetwork?: NetworkName;
  wallet?: Wallet;
}) => {
  if (overrideConfig.defaultNetwork) {
    const network = SupportedNetworks[overrideConfig.defaultNetwork];
    if (network) {
      overrideConfig.wallet = new Wallet(
        config.get("private-key") as string,
        new providers.JsonRpcProvider(network.rpcUrls[0])
      );
    } else {
      // network not found
      delete overrideConfig.defaultNetwork;
    }
  }
  masa = new Masa({ ...masaArgs, ...overrideConfig });
};

export let masa = new Masa(masaArgs);
