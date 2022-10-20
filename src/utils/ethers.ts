import { ethers } from "ethers";
import { config } from "./storage";

export const provider = new ethers.providers.JsonRpcProvider(
  config.get("rpc-url")
);

export const account = new ethers.Wallet(config.get("private-key")).connect(
  provider
);
