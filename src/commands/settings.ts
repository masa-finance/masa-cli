import { config } from "../utils/config";
import { environments } from "@masa-finance/masa-sdk/dist/src/utils";
import { masa } from "../helpers";

export const settingsSet = (key: string, value: any) => {
  config.set(key, value);
  console.log(`Key '${key}' successfully set!`);
  switch (key) {
    case "private-key":
    case "network":
    case "environment":
      config.delete("cookie");
  }
};

export const settingsPreset = (environment: string) => {
  const preset = environments.find((e) => e.name === environment.toLowerCase());

  if (preset) {
    // delete cookie on env change
    config.delete("cookie");

    config.set("api-url", preset.apiUrl);
    config.set("environment", preset.environment);
    config.set("network", preset.defaultNetwork);

    if (preset.arweave) {
      config.set("arweave-host", preset.arweave.host);
      config.set("arweave-port", preset.arweave.port);
      config.set("arweave-protocol", preset.arweave.protocol);
      config.set("arweave-logging", preset.arweave.logging);
    }

    console.log(`Preset '${environment}' set!`);
  } else {
    console.error(`Preset for environment '${environment}' not found!`);
  }
};

export const settingsShow = async () => {
  console.log("api-url", config.get("api-url"));
  console.log("rpc-url", config.get("rpc-url"));
  console.log("network", config.get("network"));
  console.log("environment", config.get("environment"));
  console.log("address", await masa.config.wallet.getAddress());
};
