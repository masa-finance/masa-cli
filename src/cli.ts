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
  creditScoreLinksCreate,
  creditScoreLinksEstablish,
  creditScoreLinksList,
  creditScoreList,
  identityBurn,
  identityCreate,
  identityInfo,
  identityRegister,
  identityShow,
  login,
  logout,
  soulNameBurn,
  soulNameCreate,
  soulNameInfo,
  soulNameList,
  soulNameSend,
  soulNameShow,
  soulNameVerify,
  version,
} from "./commands";
import { settingsPreset, settingsSet } from "./commands/settings";
import { twoFABurn, twoFACreate, twoFAInfo, twoFAList } from "./commands/2fa";

clear();
console.log(
  chalk.red(figlet.textSync("Masa CLI", { horizontalLayout: "full" }))
);

program
  .option("-v, --version", "output the version number", () => {
    if (process.argv.indexOf("--version") > -1) {
      version();
    } else {
      console.log(`v${cliVersion}`);
    }
    process.exit(0);
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
        await identityCreate(soulName, duration)
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
    .command("create")
    .argument("<soulname>", "soulname to register")
    .argument("<duration>", "period of registration")
    .description("Creates a new soul name")
    .action(
      async (soulName: string, duration: number) =>
        await soulNameCreate(soulName, duration)
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
    .action(async () => await creditScoreCreate());

  creditScore
    .command("burn")
    .argument("<credit-score-id>", "ID of the Credit Score to burn")
    .description("Burns a Credit Score")
    .action(async (creditScoreId) => await creditScoreBurn(creditScoreId));

  const creditScoreLinks = creditScore
    .command("links")
    .description("Credit Score Soul Linker Commands");

  creditScoreLinks
    .command("create")
    .argument("<credit-score-id>", "ID of the Credit Score to grant access")
    .argument(
      "<receiver-identity-id>",
      "ID of the identity that should receive access"
    )
    .description("Creates a Soul Linker Passport")
    .action(
      async (creditScoreId, receiverIdentityId) =>
        await creditScoreLinksCreate(creditScoreId, receiverIdentityId)
    );

  creditScoreLinks
    .command("establish")
    .argument("<credit-score-id>", "ID of the Credit Score to grant access")
    .argument("<passport>", "Masa Soul Linker passport")
    .description("Establishes a link to a Credit Score")
    .action(
      async (creditScoreId, passport) =>
        await creditScoreLinksEstablish(creditScoreId, passport)
    );

  creditScoreLinks
    .command("list")
    .argument(
      "<credit-score-id>",
      "ID of the Credit Score to list all the links of"
    )
    .argument("<reader-identity-id>", "ID of the Link reader identity")
    .description("Lists all soul links for a credit report id")
    .action(
      async (creditScoreId, readerIdentityId) =>
        await creditScoreLinksList(creditScoreId, readerIdentityId)
    );
}

{
  const twofa = program.command("2fa").description("2FA Commands");

  twofa
    .command("info")
    .description("Shows info about all 2FAs")
    .action(async () => await twoFAInfo());

  twofa
    .command("list")
    .description("Lists your 2FAs")
    .option("-a, --address <address>", "Address override")
    .action(async ({ address }) => await twoFAList(address));

  twofa
    .command("create")
    .argument("<phone-number>", "The phone number to verify")
    .description("Creates a 2FA Token")
    .action(async (phoneNumber: string) => await twoFACreate(phoneNumber));

  twofa
    .command("burn")
    .argument("<2fa-id>", "ID of the 2FA to burn")
    .description("Burns a 2FA")
    .action(async (twoFAId) => await twoFABurn(twoFAId));
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
}

export default program;
