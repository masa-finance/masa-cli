import { ethers } from "ethers";
import { loadContracts } from "@masa-finance/tools";
import { config } from "./config";

export const provider = new ethers.providers.JsonRpcProvider(
  config.get("rpc-url") as string
);

export const account = new ethers.Wallet(
  config.get("private-key") as string
).connect(provider);
