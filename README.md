# Masa CLI

```bash
$ masa --help
  __  __                            ____   _       ___ 
 |  \/  |   __ _   ___    __ _     / ___| | |     |_ _|
 | |\/| |  / _` | / __|  / _` |   | |     | |      | | 
 | |  | | | (_| | \__ \ | (_| |   | |___  | |___   | | 
 |_|  |_|  \__,_| |___/  \__,_|    \____| |_____| |___|
                                                       
Usage: masa [options] [command]

The Masa CLI

Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  login                                     Login to the masa infrastructure
  logout                                    Logout from the masa infrastructure
  account                                   Shows information about your account
  identity                                  Identity commands
  identity info                             Shows info about all Identities
  identity create <soulname> <duration>     Creates a masa identity with soul name
  identity show                             Shows details about your masa identity
  identity burn                             Burns your masa identity
  soul-name                                 Soul Name Commands
  soul-name info                            Shows info about all Soul Names
  soul-name list                            Shows details about your soul names
  soul-name create <soulname> <duration>    Creates a new soul name
  soul-name burn <soulname>                 Burns soul name that you own
  credit-report                             Credit Report Commands
  credit-report info                        Shows info about all Credit Reports
  credit-report list                        Shows details about your Credit Reports
  credit-report create                      Creates a Credit Report
  credit-report burn <Credit Report ID>     Burns a Credit Report
  settings                                  Set config settings
  help [command]                            display help for command
```

To get help for a specific command use:

```bash
$ masa identity --help
```

to get help for the identity commands.

## Usage / Installation

### npm

`npm install -g @masa-finance/masa-cli`

```bash
$ masa --version

CLI: v0.1.0 Contracts: v0.3.0 SDK: v0.9.1
Arweave Endpoint: https://arweave.net:443
RPC Endpoint: https://rpc.ankr.com/eth_goerli
Masa Endpoint: https://dev.middleware.masa.finance/
```

### Yarn

`yarn global add @masa-finance/masa-cli`

```bash
$ masa --version

CLI: v0.1.0 Contracts: v0.3.0 SDK: v0.9.1
Arweave Endpoint: https://arweave.net:443
RPC Endpoint: https://rpc.ankr.com/eth_goerli
Masa Endpoint: https://dev.middleware.masa.finance/
```

### npx

```bash
$ npx @masa-finance/masa-cli@latest --version

CLI: v0.1.0 Contracts: v0.3.0 SDK: v0.9.1
Arweave Endpoint: https://arweave.net:443
RPC Endpoint: https://rpc.ankr.com/eth_goerli
Masa Endpoint: https://dev.middleware.masa.finance/
```

## Commands

## `login`

Login to the masa infrastructure

## `logout`

Logout from the masa infrastructure

## `account`

Shows information about your account

## `identity`

Identity commands

### `identity info`

Shows info about all Identities

### `identity create`

Creates a masa identity with soul name

### `identity show`

Shows details about your masa identity
Options:

- `-a, --address [address]`
  Address override

### `identity burn`

Burns your masa identity

## `soul-name`

Soul Name Commands

### `soul-name info`

Shows info about all Soul Names

### `soul-name list`

Shows details about your soul names
Options:

- `-a, --address [address]`
  Address override

### `soul-name create`

Creates a new soul name

### `soul-name burn`

Burns soul name that you own

## `credit-report`

Credit Report Commands

### `credit-report info`

Shows info about all Credit Reports

### `credit-report list`

Shows details about your Credit Reports
Options:

- `-a, --address [address]`
  Address override

### `credit-report create`

Creates a Credit Report

### `credit-report burn`

Burns a Credit Report

## `settings`

Set config settings

### `settings set`

Changes setting <key> to <value>

## Configuration

All the below fields can be set with:

```bash
$ masa settings set <key> <value>
```

| Key                | Type      | Description                                                                           | Default Value                             |
|--------------------|-----------|---------------------------------------------------------------------------------------|-------------------------------------------|
| cookie             | `string`  | Stores cookie value. Don't set this manually unless you know what you do!             |                                           |
| api-url            | `string`  | The API Endpoint of the Masa Infrastructure for `dev`, `test`, `beta` and production. | "https://dev.middleware.masa.finance/"    | 
| environment        | `string`  | The environment to use `dev`, `test`, `beta`, `production`.                           | "dev"                                     |
| rpc-url            | `string`  | The RPC Endpoint to reach the Blockchain.                                             | "https://rpc.ankr.com/eth_goerli"         |
| network            | `string`  | The network name ie. "goerli".                                                        | "goerli"                                  |
| private-key        | `string`  | Your private key of the account to use in the cli.                                    | `ethers.Wallet.createRandom().privateKey` |
| arweave-host       | `string`  | The arweave host to use for loading metadata.                                         | "arweave.net"                             |
| arweave-port       | `number`  | The arweave port to use for loading metadata.                                         | 443                                       |
| arweave-protocol   | `string`  | The arweave protocol to use for loading metadata.                                     | "https"                                   |
| arweave-logging    | `boolean` | Turn arweave logging on or off.                                                       | false                                     |
