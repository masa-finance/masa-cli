import { config } from "../utils/config";
import {
  Environment,
  environments,
  Network,
  NetworkName,
  SupportedNetworks,
} from "@masa-finance/masa-sdk";
import { masa } from "../helpers";

export const settingsSet = (key: string, value: string | number) => {
  config.set(key, value);
  console.log(`Key '${key}' successfully set!`);
  switch (key) {
    case "private-key":
    case "network":
    case "environment":
      config.delete("cookie");
  }
};

export const settingsPreset = (environmentName: string) => {
  const presetEnvironment: Environment | undefined = environments.find(
    (environment) => environment.name === environmentName.toLowerCase(),
  );

  if (presetEnvironment) {
    // delete cookie on env change
    config.delete("cookie");

    config.set("api-url", presetEnvironment.apiUrl);
    config.set("environment", presetEnvironment.environment);
    config.set("network", presetEnvironment.networkName);

    if (presetEnvironment.arweave) {
      config.set("arweave-host", presetEnvironment.arweave.host);
      config.set("arweave-port", presetEnvironment.arweave.port);
      config.set("arweave-protocol", presetEnvironment.arweave.protocol);
      config.set("arweave-logging", presetEnvironment.arweave.logging);
    }

    if (presetEnvironment.networkName) {
      const network: Network | undefined =
        SupportedNetworks[presetEnvironment.networkName];
      if (network) {
        config.set("rpc-url", network.rpcUrls[0]);
      }
    }

    console.log(`Preset '${environmentName}' set!`);
  } else {
    console.error(`Preset for environment '${environmentName}' not found!`);
  }
};

export const settingsPresetNetwork = (networkName: NetworkName) => {
  const network: Network | undefined = SupportedNetworks[networkName];
  if (network) {
    config.set("rpc-url", network.rpcUrls[0]);
    config.set("network", network.networkName);

    console.log(`Preset network '${networkName}' set!`);
  } else {
    console.error(`Preset for network '${networkName}' not found!`);
  }
};

export const settingsShow = async () => {
  console.log("api-url", config.get("api-url"));
  console.log("rpc-url", config.get("rpc-url"));
  console.log("network", config.get("network"));
  console.log("environment", config.get("environment"));
  console.log("address", await masa.config.signer.getAddress());
};
