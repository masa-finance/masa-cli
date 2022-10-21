import { ethers } from "ethers";
import { config } from "./config";
import { loadContracts } from "@masa-finance/tools";

export const provider = new ethers.providers.JsonRpcProvider(
  config.get("rpc-url") as string
);

export const account = new ethers.Wallet(
  config.get("private-key") as string
).connect(provider);

export const loadIdentityContracts = async () => {
  return loadContracts({
    provider,
    network: config.get("network") as string,
  });
};
