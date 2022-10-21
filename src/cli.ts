import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import { version as cliVersion } from "../package.json";
import { config } from "./utils/config";
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
    .action(async () => {
      await identityInfo();
    });

  identity
    .command("create")
    .argument("<soulname>", "soulname to register")
    .argument("<duration>", "period of registration")
    .description("Creates a masa identity with soul name")
    .action(async (soulname: string, duration: number) => {
      await identityCreate(soulname, duration);
    });

  identity
    .command("show")
    .description("Shows details about your masa identity")
    .action(async () => {
      await identityShow();
    });

  identity
    .command("burn")
    .description("Burns your masa identity")
    .action(async () => {
      await identityBurn();
    });
}

{
  const soulName = program
    .command("soul-name")
    .description("Soul Name Commands");

  soulName
    .command("info")
    .description("Shows info about all Soul Names")
    .action(async () => {
      await soulNameInfo();
    });

  soulName
    .command("list")
    .description("Shows details about your soul names")
    .action(async () => {
      await soulNameList();
    });

  soulName
    .command("create")
    .argument("<soulname>", "soulname to register")
    .argument("<duration>", "period of registration")
    .description("Creates a new soul name")
    .action(async (soulname: string, duration: number) => {
      await soulNameCreate(soulname, duration);
    });

  soulName
    .command("burn")
    .argument("<soulname>", "soulname to register")
    .description("Burns soul name that you own")
    .action(async (soulname: string) => {
      await soulNameBurn(soulname);
    });
}

{
  const creditReport = program
    .command("credit-report")
    .description("Credit Report Commands");

  creditReport
    .command("info")
    .description("Shows info about all Credit Reports")
    .action(async () => {
      await creditReportInfo();
    });

  creditReport
    .command("list")
    .description("Shows details about your Credit Reports")
    .action(async () => {
      await creditReportList();
    });

  creditReport
    .command("create")
    .description("Creates a Credit Report")
    .action(async () => {
      await creditReportCreate();
    });

  creditReport
    .command("burn")
    .argument("<Credit Report ID>", "ID of the Credit Report to burn")
    .description("Burns a Credit Report")
    .action(async (creditReportId) => {
      await creditReportBurn(creditReportId);
    });
}

{
  const settings = program
    .command("settings")
    .description("Set config settings");

  settings
    .command("set")
    .argument("<key>", "soulname to register")
    .argument("<value>", "period of registration")
    .description("Changes setting <key> to <value>")
    .action(async (key: string, value: any) => {
      config.set(key, value);
    });
}

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
