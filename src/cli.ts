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
  sbtDeployASBT,
  sbtDeploySSSBT,
  sbtInfo,
  sbtList,
  sbtMintASBT,
  sbtMintASBTBulk,
  sbtMintASBTFromSoulname,
  sbtMintSSSBT,
  sbtSignSSSBT,
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
  soulNameTail,
  soulNameVerify,
  version,
} from "./commands";
import { reloadMasa } from "./helpers";
import { MasaArgs, NetworkName } from "@masa-finance/masa-sdk";

clear();
console.log(
  chalk.red(figlet.textSync("Masa CLI", { horizontalLayout: "full" }))
);

const overrides: Partial<MasaArgs> = {
  verbose: undefined,
  networkName: undefined,
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
    console.log("Masa CLI running with verbose output!\n");
    overrides.verbose = true;
    reloadMasa(overrides);
  })
  .option("-n, --network <network>", "Address override", (networkName) => {
    overrides.networkName = networkName as NetworkName;
    reloadMasa(overrides);
  })
  .usage("[command] [subcommand] [arguments] [options]")
  .description("The Masa CLI");

program
  .command("login")
  .description("Login to the masa infrastructure")
  .action(() => login());

program
  .command("logout")
  .description("Logout from the masa infrastructure")
  .action(() => logout());

program
  .command("account")
  .option("-a, --address <address>", "Address override")
  .description("Shows information about your account")
  .action(({ address }) => account(address));

{
  const identity = program.command("identity").description("Identity commands");

  identity
    .command("info")
    .description("Shows info about all Identities")
    .action(() => identityInfo());

  identity
    .command("create")
    .argument("<soulname>", "Soul Name to register")
    .argument("<duration>", "Period of registration")
    .description("Creates a masa identity with soul name")
    .action((soulName: string, duration: number) =>
      identityCreate("ETH", soulName, duration)
    );

  identity
    .command("register")
    .description("Creates a masa identity without soul name")
    .action(() => identityRegister());

  identity
    .command("show")
    .option("-a, --address <address>", "Address override")
    .description("Shows detail about your masa identity")
    .action(({ address }) => identityShow(address));

  identity
    .command("burn")
    .description("Burns your masa identity")
    .action(() => identityBurn());
}

{
  const soulName = program
    .command("soul-name")
    .description("Soul Name Commands");

  soulName
    .command("info")
    .description("Shows info about all Soul Names")
    .action(() => soulNameInfo());

  soulName
    .command("list")
    .description("Lists your soul names")
    .option("-a, --address <address>", "Address override")
    .action(({ address }) => soulNameList(address));

  soulName
    .command("tail")
    .description("Tails your soul names")
    .option("-l, --limit <limit>", "Limit")
    .action(({ limit }) => soulNameTail(limit));

  soulName
    .command("resolve")
    .description("Resolves a soul name to the address")
    .argument("<soulname>", "Soul Name to resolve")
    .action((soulName: string) => soulNameResolve(soulName));

  soulName
    .command("resolve-reverse")
    .description("Resolves an address to soul names")
    .argument("<soulname>", "Address to resolve")
    .action((address: string) => soulNameResolveReverse(address));

  soulName
    .command("create")
    .argument("<soulname>", "soulname to register")
    .argument("<duration>", "period of registration")
    .description("Creates a new soul name")
    .action((soulName: string, duration: number) =>
      soulNameCreate("ETH", soulName, duration)
    );

  soulName
    .command("burn")
    .argument("<soulname>", "Soul Name to burn")
    .description("Burns soul name that you own")
    .action((soulName: string) => soulNameBurn(soulName));

  soulName
    .command("send")
    .argument("<soulname>", "Soul Name to send")
    .argument("<receiver>", "Receiver to receive the Soul Name")
    .description("Sends a soul name to that you own to a receiver")
    .action((soulName: string, receiver: string) =>
      soulNameSend(soulName, receiver)
    );

  soulName
    .command("show")
    .argument("<soulname>", "Soul Name to show")
    .description("Shows info about a Soul Name")
    .action((soulName: string) => soulNameShow(soulName));

  soulName
    .command("verify")
    .argument("<soulname>", "Soul Name to verify")
    .description("Verifies a Soul Name")
    .action((soulName: string) => soulNameVerify(soulName));
}

{
  const creditScore = program
    .command("credit-score")
    .description("Credit Score Commands");

  creditScore
    .command("info")
    .description("Shows info about all Credit Scores")
    .action(() => creditScoreInfo());

  creditScore
    .command("list")
    .description("Lists your Credit Scores")
    .option("-a, --address <address>", "Address override")
    .action(({ address }) => creditScoreList(address));

  creditScore
    .command("create")
    .description("Creates a Credit Score")
    .action(() => creditScoreCreate("ETH"));

  creditScore
    .command("burn")
    .argument("<credit-score-id>", "ID of the Credit Score to burn")
    .description("Burns a Credit Score")
    .action((creditScoreId) => creditScoreBurn(creditScoreId));

  creditScore
    .command("load")
    .argument("<credit-score-id>", "ID of the Credit Score to load")
    .description("Loads a Credit Score")
    .action((creditScoreId) => creditScoreLoad(creditScoreId));

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
    .action((creditScoreId, readerIdentityId) =>
      creditScoreLinkCreate(creditScoreId, readerIdentityId)
    );

  creditScoreLink
    .command("establish")
    .argument("<passport>", "Masa Soul Linker passport")
    .description("Establishes a link to a Credit Score")
    .action((passport) => creditScoreLinkEstablish("ETH", passport));

  creditScoreLink
    .command("query")
    .argument("<passport>", "Masa Soul Linker passport")
    .description("Queries a link to a Credit Score")
    .action((passport) => creditScoreLinkQuery("ETH", passport));

  creditScoreLink
    .command("list")
    .argument(
      "<credit-score-id>",
      "ID of the Credit Score to list all the links of"
    )
    .description("Lists all soul links for a credit score id")
    .action((creditScoreId) => creditScoreLinkList(creditScoreId));

  creditScoreLink
    .command("verify")
    .argument("<credit-score-id>", "ID of the Credit Score to grant access")
    .option(
      "-r, --reader-identity-id <reader-identity-id>",
      "ID of the identity that should receive access"
    )
    .description("Verifies a Soul Link")
    .action((creditScoreId, { readerIdentityId }) =>
      creditScoreLinkVerify(creditScoreId, readerIdentityId)
    );

  creditScoreLink
    .command("break")
    .argument("<credit-score-id>", "ID of the Credit Score to grant access")
    .argument(
      "<reader-identity-id>",
      "ID of the identity that should receive access"
    )
    .description("Breaks a Soul Link")
    .action((creditScoreId, readerIdentityId) =>
      creditScoreLinkBreak(creditScoreId, readerIdentityId)
    );
}

{
  const green = program.command("green").description("Green Commands");

  green
    .command("info")
    .description("Shows info about Masa Green")
    .action(() => greenInfo());

  green
    .command("list")
    .description("Lists your Greens")
    .option("-a, --address <address>", "Address override")
    .action(({ address }) => greenList(address));

  green
    .command("create")
    .argument("<phone-number>", "The phone number to verify")
    .description("Creates a Green Token")
    .action((phoneNumber: string) => greenCreate("ETH", phoneNumber));

  green
    .command("burn")
    .argument("<green-id>", "ID of the Green to burn")
    .description("Burns a green")
    .action((greenId) => greenBurn(greenId));
}

{
  const sbt = program.command("sbt").description("SBT Commands");

  sbt
    .command("info")
    .description("Shows info about an SBT")
    .argument("<contract-address>", "Address of the SBT to sign")
    .action((contractAddress: string) => sbtInfo(contractAddress));

  sbt
    .command("list")
    .description("Lists your SBTs")
    .argument("<contract-address>", "Address of the SBT contract to list")
    .option("-a, --address <address>", "Address override")
    .action((contractAddress: string, { address }) =>
      sbtList(contractAddress, address)
    );

  sbt
    .command("burn")
    .argument("<contract-address>", "Address of the SBT to sign")
    .argument("<sbt-id>", "ID of the SBT to burn")
    .description("Burns an SBT")
    .action((contractAddress: string, SBTId: string) =>
      sbtBurn(contractAddress, SBTId)
    );
}

{
  const asbt = program.command("asbt").description("ASBT Commands");

  asbt
    .command("deploy")
    .description("Deploys ASBTs")
    .action(() => sbtDeployASBT());

  asbt
    .command("mint")
    .description("Mints ASBTs")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<receiver>", "Address of the SBT receiver")
    .action((contractAddress, receiver) =>
      sbtMintASBT(contractAddress, receiver)
    );
  asbt
    .command("bulk-mint")
    .description("Mints ASBTs from CSV files")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<csv>", "Address of the SBT receiver")
    .action((contractAddress, csv) => sbtMintASBTBulk(contractAddress, csv));

  asbt
    .command("mint-to-soulname")
    .description("Mints ASBTs from soulname")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<soulname>", "Address of the SBT receiver")
    .action((contractAddress, soulname) =>
      sbtMintASBTFromSoulname(contractAddress, soulname)
    );
}

{
  const sssbt = program.command("sssbt").description("SSSBT Commands");

  sssbt
    .command("deploy")
    .description("Deploys SSSBTs")
    .action(() => sbtDeploySSSBT());

  sssbt
    .command("sign")
    .description("Signs SSSBTs")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<receiver>", "Address of the SBT receiver")
    .action((contractAddress: string, receiver: string) =>
      sbtSignSSSBT(contractAddress, receiver)
    );

  sssbt
    .command("mint")
    .description("Mints SSSBTs")
    .argument("<contract-address>", "Address of the SBT to mint on")
    .argument("<authority-address>", "Address of the Authority")
    .argument("<signature-date>", "sig date")
    .argument("<signature>", "signature")
    .action(
      (
        contractAddress: string,
        authorityAddress: string,
        signatureDate: number,
        signature: string
      ) =>
        sbtMintSSSBT(
          contractAddress,
          authorityAddress,
          signatureDate,
          signature
        )
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
