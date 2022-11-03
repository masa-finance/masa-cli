import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import { version as cliVersion } from "../package.json";
import {
  login,
  logout,
  soulNameList,
  soulNameCreate,
  soulNameBurn,
  identityShow,
  identityCreate,
  identityBurn,
  version,
  account,
  creditReportCreate,
  creditReportList,
  creditReportBurn,
  soulNameInfo,
  identityInfo,
  creditReportInfo,
} from "./commands";
import { settingsPreset, settingsSet } from "./commands/settings";
import { twofaBurn, twofaCreate, twofaInfo, twofaList } from "./commands/2fa";

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
    .argument("<soulname>", "soulname to register")
    .argument("<duration>", "period of registration")
    .description("Creates a masa identity with soul name")
    .action(
      async (soulname: string, duration: number) =>
        await identityCreate(soulname, duration)
    );

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
      async (soulname: string, duration: number) =>
        await soulNameCreate(soulname, duration)
    );

  soulName
    .command("burn")
    .argument("<soulname>", "soulname to burn")
    .description("Burns soul name that you own")
    .action(async (soulname: string) => await soulNameBurn(soulname));
}

{
  const creditReport = program
    .command("credit-report")
    .description("Credit Report Commands");

  creditReport
    .command("info")
    .description("Shows info about all Credit Reports")
    .action(async () => await creditReportInfo());

  creditReport
    .command("list")
    .description("Lists your Credit Reports")
    .option("-a, --address <address>", "Address override")
    .action(async ({ address }) => await creditReportList(address));

  creditReport
    .command("create")
    .description("Creates a Credit Report")
    .action(async () => await creditReportCreate());

  creditReport
    .command("burn")
    .argument("<credit-report-id>", "ID of the Credit Report to burn")
    .description("Burns a Credit Report")
    .action(async (creditReportId) => await creditReportBurn(creditReportId));
}

{
  const twofa = program.command("2fa").description("2fa Commands");

  twofa
    .command("info")
    .description("Shows info about all 2fas")
    .action(async () => await twofaInfo());

  twofa
    .command("list")
    .description("Lists your 2fas")
    .option("-a, --address <address>", "Address override")
    .action(async ({ address }) => await twofaList(address));

  twofa
    .command("create")
    .description("Creates a 2fa Token")
    .action(async () => await twofaCreate());

  twofa
    .command("burn")
    .argument("<2fa-id>", "ID of the 2fa to burn")
    .description("Burns a 2fa")
    .action(async (twofaId) => await twofaBurn(twofaId));
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
