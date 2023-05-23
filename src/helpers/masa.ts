import {
  EnvironmentName,
  Masa,
  MasaArgs,
  NetworkName,
  SupportedNetworks,
} from "@masa-finance/masa-sdk";
import { config } from "../utils/config";
import { providers, Wallet } from "ethers";

const loadWallet = (rpcUrl?: string) =>
  new Wallet(
    config.get("private-key") as string,
    new providers.JsonRpcProvider(rpcUrl || (config.get("rpc-url") as string))
  );

const masaArgs: MasaArgs = {
  cookie: config.get("cookie") as string,
  signer: loadWallet(),
  apiUrl: config.get("api-url") as string,
  environment: config.get("environment") as EnvironmentName,
  networkName: config.get("network") as NetworkName,
  verbose: config.get("verbose") as boolean,
  arweave: {
    host: config.get("arweave-host") as string,
    port: config.get("arweave-port") as number,
    protocol: config.get("arweave-protocol") as string,
    logging: config.get("arweave-logging") as boolean,
  },
};

export const reloadMasa = (overrideConfig: Partial<MasaArgs>) => {
  if (overrideConfig.networkName) {
    const network = SupportedNetworks[overrideConfig.networkName];
    if (network) {
      overrideConfig.signer = loadWallet(network.rpcUrls[0]);
    } else {
      console.error(
        `Network '${overrideConfig.networkName}' not found! Using '${masaArgs.networkName}'`
      );
      // network not found
      delete overrideConfig.networkName;
    }
  }

  /*
    const contractOverrides: Partial<IIdentityContracts> = {
      SoulStoreContract: SoulStore__factory.connect(
        constants.AddressZero,
        overrideConfig.wallet || masaArgs.wallet
      ),
      SoulNameContract: SoulName__factory.connect(
        constants.AddressZero,
        overrideConfig.wallet || masaArgs.wallet
      ),
    };

    if (contractOverrides.SoulStoreContract) {
      contractOverrides.SoulStoreContract.hasAddress = true;
    }
    if (contractOverrides.SoulNameContract) {
      contractOverrides.SoulNameContract.hasAddress = true;
    }
  */

  masa = new Masa({
    ...masaArgs,
    ...overrideConfig,
  });
};

export let masa = new Masa(masaArgs);
