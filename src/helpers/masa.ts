import {
  EnvironmentName,
  isSigner,
  Masa,
  MasaArgs,
  NetworkName,
  SupportedNetworks,
} from "@masa-finance/masa-sdk";
import { config } from "../utils/config";
import { providers, Signer, Wallet } from "ethers";
import { SoulName__factory } from "@masa-finance/masa-contracts-identity";
import { Connection, Keypair } from "@solana/web3.js";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";

const loadWallet = ({
  rpcUrl,
  privateKey,
  mnemonic,
  networkName,
  verbose,
}: {
  rpcUrl?: string;
  privateKey?: string;
  mnemonic?: string;
  networkName?: NetworkName;
  verbose?: boolean;
} = {}):
  | Signer
  | {
      keypair: Keypair;
      connection: Connection;
    } => {
  const network =
    SupportedNetworks[networkName ?? (config.get("network") as NetworkName)];

  mnemonic = mnemonic || (config.get("mnemonic") as string);
  const provider = new providers.JsonRpcProvider(
    rpcUrl || (config.get("rpc-url") as string),
  );

  if (mnemonic) {
    if (network?.type === "evm") {
      // load evm style
      return Wallet.fromMnemonic(mnemonic).connect(provider);
    } else {
      // load solana style
      const seed = mnemonicToSeedSync(mnemonic, "");

      const index = 0;
      // solana deviation path
      const path = `m/44'/501'/${index}'/0'`;
      const keypair: Keypair = Keypair.fromSeed(
        derivePath(path, seed.toString("hex")).key,
      );

      if (verbose) {
        console.log(`${path} => ${keypair.publicKey.toBase58()}`);
      }

      return {
        connection: new Connection(network?.rpcUrls[0] || ""),
        keypair,
      };
    }
  }

  const pk = privateKey || (config.get("private-key") as string);

  return new Wallet(pk, provider);
};

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

export const loadMasa = (
  overrideConfig: Partial<MasaArgs> & {
    privateKey?: string;
    rpcUrl?: string;
    soulNameContractAddress?: string;
  },
): Masa => {
  // override network
  if (overrideConfig.networkName) {
    const network = SupportedNetworks[overrideConfig.networkName];
    if (network) {
      overrideConfig = {
        ...overrideConfig,
        signer: loadWallet({
          rpcUrl: overrideConfig.rpcUrl || network.rpcUrls[0],
          privateKey: overrideConfig.privateKey,
          networkName: overrideConfig.networkName,
          verbose: overrideConfig.verbose,
        }),
      };
    } else {
      console.error(
        `Network '${overrideConfig.networkName}' not found! Using '${masaArgs.networkName}'`,
      );
      // network not found
      overrideConfig = {
        ...overrideConfig,
        networkName: masaArgs.networkName,
      };
    }
  }

  // override rpc url
  if (overrideConfig.rpcUrl) {
    overrideConfig = {
      ...overrideConfig,
      signer: loadWallet({
        rpcUrl: overrideConfig.rpcUrl,
        privateKey: overrideConfig.privateKey,
        networkName: overrideConfig.networkName,
        verbose: overrideConfig.verbose,
      }),
    };
  }

  // override private key
  if (overrideConfig.privateKey) {
    overrideConfig = {
      ...overrideConfig,
      signer: loadWallet({
        rpcUrl: overrideConfig.rpcUrl,
        privateKey: overrideConfig.privateKey,
        networkName: overrideConfig.networkName,
        verbose: overrideConfig.verbose,
      }),
    };
  }

  const signer =
    overrideConfig?.signer ||
    loadWallet({
      rpcUrl: overrideConfig.rpcUrl,
      privateKey: overrideConfig.privateKey,
      networkName: overrideConfig.networkName,
      verbose: overrideConfig.verbose,
    });
  // override soul name contract
  if (overrideConfig.soulNameContractAddress && isSigner(signer)) {
    overrideConfig = {
      ...overrideConfig,
      contractOverrides: {
        SoulNameContract: SoulName__factory.connect(
          overrideConfig.soulNameContractAddress,
          signer,
        ),
      },
    };

    if (overrideConfig.contractOverrides?.SoulNameContract) {
      overrideConfig.contractOverrides.SoulNameContract.hasAddress = true;
    }
  }

  masa = new Masa({
    ...masaArgs,
    ...overrideConfig,
  });

  return masa;
};

export let masa = loadMasa(masaArgs);
