import { ethers } from "ethers";

const Conf = require("conf");

/*
macOS: ~/Library/Preferences/.masa/config.json
Windows: %APPDATA%\.masa\config.json
Linux: ~/.config/.masa/config.json (or $XDG_CONFIG_HOME/.masa/config.json)
 */

export const config = new Conf({
  projectName: ".masa",
  configName: "config",
  projectSuffix: "",
  schema: {
    cookie: {
      type: "string",
      default: undefined,
    },
    "api-url": {
      type: "string",
      format: "uri",
      default: "http://localhost:4000/",
    },
    environment: {
      type: "string",
      default: "dev",
    },
    "rpc-url": {
      type: "string",
      format: "uri",
      default: "https://rpc.ankr.com/eth_goerli",
    },
    "private-key": {
      type: "string",
      default: ethers.Wallet.createRandom().privateKey,
    },
    "arweave-host": {
      type: "string",
      default: "arweave.net",
    },
    "arweave-port": {
      type: "number",
      default: 443,
    },
    "arweave-protocol": {
      type: "string",
      default: "https",
    },
    "arweave-logging": {
      type: "boolean",
      default: false,
    },
  },
});
