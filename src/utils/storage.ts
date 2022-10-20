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
      default: undefined,
    },
    arweave: {
      type: "object",
      properties: {
        host: {
          type: "string",
          default: "arweave.net",
        },
        port: {
          type: "number",
          default: 443,
        },
        protocol: {
          type: "string",
          default: "https",
        },
        logging: {
          type: "boolean",
          default: false,
        },
      },
    },
  },
});
