import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import { version as cliVersion } from "../package.json";
import {
  account,
  creditScoreBurn,
  creditScoreCreate,
  creditScoreInfo,
  creditScoreLinkBreak,
  creditScoreLinkCreate,
  creditScoreLinkEstablish,
  creditScoreLinkList,
  creditScoreLinkQuery,
  creditScoreLinkVerify,
  creditScoreList,
  creditScoreLoad,
  greenBurn,
  greenCreate,
  greenInfo,
  greenList,
  identityBurn,
  identityCreate,
  identityInfo,
  identityRegister,
  identityShow,
  login,
  logout,
  sbtBurn,
  sbtInfo,
  sbtList,
  sbtPrepareMint,
  sbtSign,
  settingsPreset,
  settingsPresetNetwork,
  settingsSet,
  settingsShow,
  soulNameBurn,
  soulNameCreate,
  soulNameInfo,
  soulNameList,
  soulNameResolve,
  soulNameResolveReverse,
  soulNameSend,
  soulNameShow,
  soulNameVerify,
  version,
} from "./commands";
import { reloadMasa } from "./helpers";
import { NetworkName } from "@masa-finance/masa-sdk";

clear();
console.log(
  chalk.red(figlet.textSync("Masa CLI", { horizontalLayout: "full" }))
);

const overrides: {
  verbose?: boolean;
  defaultNetwork?: NetworkName;
} = {
  verbose: undefined,
  defaultNetwork: undefined,
};

program
  .option("-v, --version", "output the version number", () => {
    if (process.argv.indexOf("--version") > -1) {
      version();
    } else {
      console.log(`v${cliVersion}`);
    }
    process.exit(0);
  })
  .option("--verbose", "output with verbose logging", () => {
    console.log("Masa cli running with verbose output!\n");
    overrides.verbose = true;
    reloadMasa(overrides);
  })
  .option("-n, --network <network>", "Address override", (networkName) => {
    overrides.defaultNetwork = networkName as NetworkName;
    reloadMasa(overrides);
  })
  .usage("[command] [subcommand] [arguments] [options]")
  .description("The Masa CLI");

program
  .command("login")
  .description("Login to the masa infrastructure")
  .action(async () => {
    await login();
  });

program
  .command("logout")
  .description("Logout from the masa infrastructure")
  .action(async () => {
    await logout();
  });

program
  .command("account")
  .description("Shows information about your account")
  .action(async () => {
    await account();
  });

{
  const identity = program.command("identity").description("Identity commands");

  identity
    .command("info")
    .description("Shows info about all Identities")
    .action(async () => await identityInfo());

  identity
    .command("create")
    .argument("<soulname>", "Soul Name to register")
    .argument("<duration>", "Period of registration")
    .description("Creates a masa identity with soul name")
    .action(
      async (soulName: string, duration: number) =>
        await identityCreate("ETH", soulName, duration)
    );

  identity
    .command("register")
    .description("Creates a masa identity without soul name")
    .action(async () => await identityRegister());

  identity
    .command("show")
    .option("-a, --address <address>", "Address override")
    .description("Shows detail about your masa identity")
    .action(async ({ address }) => await identityShow(address));

  identity
    .command("burn")
    .description("Burns your masa identity")
    .action(async () => await identityBurn());
}

{
  const soulName = program
    .command("soul-name")
    .description("Soul Name Commands");

  soulName
    .command("info")
    .description("Shows info about all Soul Names")
    .action(async () => await soulNameInfo());

  soulName
    .command("list")
    .description("Lists your soul names")
    .option("-a, --address <address>", "Address override")
    .action(async ({ address }) => await soulNameList(address));

  soulName
    .command("resolve")
    .description("Resolves a soul name to the address")
    .argument("<soulname>", "Soul Name to resolve")
    .action(async (soulName: string) => await soulNameResolve(soulName));

  soulName
    .command("resolve-reverse")
    .description("Resolves an address to soul names")
    .argument("<soulname>", "Address to resolve")
    .action(async (address: string) => await soulNameResolveReverse(address));

  soulName
    .command("create")
    .argument("<soulname>", "soulname to register")
    .argument("<duration>", "period of registration")
    .description("Creates a new soul name")
    .action(
      async (soulName: string, duration: number) =>
        await soulNameCreate("ETH", soulName, duration)
    );

  soulName
    .command("burn")
    .argument("<soulname>", "Soul Name to burn")
    .description("Burns soul name that you own")
    .action(async (soulName: string) => await soulNameBurn(soulName));

  soulName
    .command("send")
    .argument("<soulname>", "Soul Name to send")
    .argument("<receiver>", "Receiver to receive the Soul Name")
    .description("Sends a soul name to that you own to a receiver")
    .action(
      async (soulName: string, receiver: string) =>
        await soulNameSend(soulName, receiver)
    );

  soulName
    .command("show")
    .argument("<soulname>", "Soul Name to show")
    .description("Shows info about a Soul Name")
    .action(async (soulName: string) => await soulNameShow(soulName));

  soulName
    .command("verify")
    .argument("<soulname>", "Soul Name to verify")
    .description("Verifies a Soul Name")
    .action(async (soulName: string) => await soulNameVerify(soulName));
}

{
  const creditScore = program
    .command("credit-score")
    .description("Credit Score Commands");

  creditScore
    .command("info")
    .description("Shows info about all Credit Scores")
    .action(async () => await creditScoreInfo());

  creditScore
    .command("list")
    .description("Lists your Credit Scores")
    .option("-a, --address <address>", "Address override")
    .action(async ({ address }) => await creditScoreList(address));

  creditScore
    .command("create")
    .description("Creates a Credit Score")
    .action(async () => await creditScoreCreate("ETH"));

  creditScore
    .command("burn")
    .argument("<credit-score-id>", "ID of the Credit Score to burn")
    .description("Burns a Credit Score")
    .action(async (creditScoreId) => await creditScoreBurn(creditScoreId));

  creditScore
    .command("load")
    .argument("<credit-score-id>", "ID of the Credit Score to load")
    .description("Loads a Credit Score")
    .action(async (creditScoreId) => await creditScoreLoad(creditScoreId));

  const creditScoreLink = creditScore
    .command("link")
    .description("Credit Score Soul Linker Commands");

  creditScoreLink
    .command("create")
    .argument("<credit-score-id>", "ID of the Credit Score to grant access")
    .argument(
      "<reader-identity-id>",
      "ID of the identity that should receive access"
    )
    .description("Creates a Soul Linker Passport")
    .action(
      async (creditScoreId, readerIdentityId) =>
        await creditScoreLinkCreate(creditScoreId, readerIdentityId)
    );

  creditScoreLink
    .command("establish")
    .argument("<passport>", "Masa Soul Linker passport")
    .description("Establishes a link to a Credit Score")
    .action(
      async (passport) => await creditScoreLinkEstablish("ETH", passport)
    );

  creditScoreLink
    .command("query")
    .argument("<passport>", "Masa Soul Linker passport")
    .description("Queries a link to a Credit Score")
    .action(async (passport) => await creditScoreLinkQuery("ETH", passport));

  creditScoreLink
    .command("list")
    .argument(
      "<credit-score-id>",
      "ID of the Credit Score to list all the links of"
    )
    .description("Lists all soul links for a credit report id")
    .action(async (creditScoreId) => await creditScoreLinkList(creditScoreId));

  creditScoreLink
    .command("verify")
    .argument("<credit-score-id>", "ID of the Credit Score to grant access")
    .option(
      "-r, --reader-identity-id <reader-identity-id>",
      "ID of the identity that should receive access"
    )
    .description("Verifies a Soul Link")
    .action(
      async (creditScoreId, { readerIdentityId }) =>
        await creditScoreLinkVerify(creditScoreId, readerIdentityId)
    );

  creditScoreLink
    .command("break")
    .argument("<credit-score-id>", "ID of the Credit Score to grant access")
    .argument(
      "<reader-identity-id>",
      "ID of the identity that should receive access"
    )
    .description("Breaks a Soul Link")
    .action(
      async (creditScoreId, readerIdentityId) =>
        await creditScoreLinkBreak(creditScoreId, readerIdentityId)
    );
}

{
  const green = program.command("green").description("Green Commands");

  green
    .command("info")
    .description("Shows info about Masa Green")
    .action(async () => await greenInfo());

  green
    .command("list")
    .description("Lists your Greens")
    .option("-a, --address <address>", "Address override")
    .action(async ({ address }) => await greenList(address));

  green
    .command("create")
    .argument("<phone-number>", "The phone number to verify")
    .description("Creates a Green Token")
    .action(
      async (phoneNumber: string) => await greenCreate("ETH", phoneNumber)
    );

  green
    .command("burn")
    .argument("<green-id>", "ID of the Green to burn")
    .description("Burns a green")
    .action(async (greenId) => await greenBurn(greenId));
}

{
  const sbt = program.command("sbt").description("SBT Commands");

  sbt
    .command("info")
    .description("Shows info about an SBT")
    .argument("<contract-address>", "Address of the SBT to sign")
    .action(async (contractAddress: string) => await sbtInfo(contractAddress));

  sbt
    .command("list")
    .description("Lists your SBTs")
    .argument("<contract-address>", "Address of the SBT contract to list")
    .option("-a, --address <address>", "Address override")
    .action(
      async (contractAddress: string, { address }) =>
        await sbtList(contractAddress, address)
    );

  sbt
    .command("sign")
    .description("Signs an SBT")
    .argument("<contract-address>", "Address of the SBT to sign")
    .argument("<name>", "Name of the contract")
    .argument("<types>", "Types structure to sign")
    .argument("<value>", "Values of the structure")
    .action(
      async (
        contractAddress: string,
        name: string,
        types: string,
        value: string
      ) => await sbtSign(contractAddress, name, types, value)
    );

  sbt
    .command("prepare-mint")
    .description("Prepares an SBT mint operation")
    .argument("<contract-address>", "Address of the SBT to sign")
    .argument("<name>", "Name of the contract")
    .argument("<types>", "Types structure to sign")
    .argument("<value>", "Values of the structure")
    .argument("<authority-address>", "Authority address used for signing")
    .argument("<signature>", "Signature from the signing step")
    .action(
      async (
        contractAddress: string,
        name: string,
        types: string,
        value: string,
        authorityAddress: string,
        signature: string
      ) =>
        await sbtPrepareMint(
          "ETH",
          contractAddress,
          name,
          types,
          value,
          authorityAddress,
          signature
        )
    );

  sbt
    .command("burn")
    .argument("<contract-address>", "Address of the SBT to sign")
    .argument("<sbt-id>", "ID of the SBT to burn")
    .description("Burns an SBT")
    .action(
      async (contractAddress: string, greenId: string) =>
        await sbtBurn(contractAddress, greenId)
    );
}

{
  const settings = program
    .command("settings")
    .description("Set config settings");

  settings
    .command("set")
    .argument("<key>", "key to set")
    .argument("<value>", "value to set to key")
    .description("Changes setting <key> to <value>")
    .action((key: string, value: any) => settingsSet(key, value));

  settings
    .command("preset")
    .argument("<environment>", "The environment to use as preset")
    .description("Changes setting <environment> presets")
    .action((environment: string) => settingsPreset(environment));

  settings
    .command("preset-network")
    .argument("<network-name>", "The network to use as preset")
    .description("Changes setting <network-name> presets")
    .action((networkName: NetworkName) => settingsPresetNetwork(networkName));

  settings
    .command("show")
    .description("Shows config values")
    .action(() => settingsShow());
}

export default program;
