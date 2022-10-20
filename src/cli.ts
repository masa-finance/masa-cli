import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import { version as cliVersion } from "../package.json";
import { config } from "./utils/storage";
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
} from "./commands";

clear();
console.log(
  chalk.red(figlet.textSync("Masa CLI", { horizontalLayout: "full" }))
);

program.version(cliVersion).description("The Masa CLI");

program
  .command("login")
  .description("Login to the masa infrastructure")
  .action(async () => {
    await login();
  });
program
  .command("version")
  .description("Details about the current version of the cli")
  .action(async () => {
    await version();
  });

program
  .command("logout")
  .description("Logout from the masa infrastructure")
  .action(async () => {
    await logout();
  });

const identity = program.command("identity").description("Identity commands");

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

const soulName = program.command("soul-name").description("Soul Name Commands");

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

const settings = program.command("settings").description("Set config settings");

settings
  .command("set")
  .argument("<key>", "soulname to register")
  .argument("<value>", "period of registration")
  .description("Changes setting <key> to <value>")
  .action(async (key: string, value: any) => {
    config.set(key, value);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
