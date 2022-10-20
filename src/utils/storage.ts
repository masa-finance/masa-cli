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
  defaults: {
    cookie: undefined,
    "api-url": "http://localhost:4000/",
    environment: "dev",
    "rpc-url": "https://rpc.ankr.com/eth_goerli",
    "private-key": undefined,
    arweave: {
      host: "arweave.net",
      port: 443,
      protocol: "https",
      logging: false,
    },
  },
});
