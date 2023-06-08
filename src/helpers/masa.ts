import {
  EnvironmentName,
  Masa,
  MasaArgs,
  NetworkName,
  SupportedNetworks,
} from "@masa-finance/masa-sdk";
import { config } from "../utils/config";
import { providers, Wallet } from "ethers";
import { SoulName__factory } from "@masa-finance/masa-contracts-identity";

const loadWallet = ({
  rpcUrl,
  privateKey,
}: {
  rpcUrl?: string;
  privateKey?: string;
} = {}) =>
  new Wallet(
    privateKey || (config.get("private-key") as string),
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

export const reloadMasa = (
  overrideConfig: Partial<MasaArgs> & {
    privateKey?: string;
    rpcUrl?: string;
    soulNameContractAddress?: string;
  }
) => {
  // override network
  if (overrideConfig.networkName) {
    const network = SupportedNetworks[overrideConfig.networkName];
    if (network) {
      overrideConfig.signer = loadWallet({
        rpcUrl: overrideConfig.rpcUrl || network.rpcUrls[0],
        privateKey: overrideConfig.privateKey,
      });
    } else {
      console.error(
        `Network '${overrideConfig.networkName}' not found! Using '${masaArgs.networkName}'`
      );
      // network not found
      delete overrideConfig.networkName;
    }
  }

  // override rpc url
  if (overrideConfig.rpcUrl) {
    overrideConfig.signer = loadWallet({
      rpcUrl: overrideConfig.rpcUrl,
      privateKey: overrideConfig.privateKey,
    });
  }

  // override private key
  if (overrideConfig.privateKey) {
    overrideConfig.signer = loadWallet({
      rpcUrl: overrideConfig.rpcUrl,
      privateKey: overrideConfig.privateKey,
    });
  }

  // override soul name contract
  if (overrideConfig.soulNameContractAddress) {
    overrideConfig.contractOverrides = {
      SoulNameContract: SoulName__factory.connect(
        overrideConfig.soulNameContractAddress,
        overrideConfig?.signer || masa.config.signer
      ),
    };
    if (overrideConfig.contractOverrides?.SoulNameContract) {
      overrideConfig.contractOverrides.SoulNameContract.hasAddress = true;
    }
  }

  masa = new Masa({
    ...masaArgs,
    ...overrideConfig,
  });
};

export let masa = new Masa(masaArgs);
