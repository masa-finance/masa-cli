import { ethers } from "ethers";
import { config } from "./storage";

export const provider = new ethers.providers.JsonRpcProvider(
  config.get("rpc-url")
);

const pk = config.get("private-key");
export const account = pk
  ? new ethers.Wallet(pk).connect(provider)
  : ethers.Wallet.createRandom();
