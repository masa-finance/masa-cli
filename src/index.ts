#!/usr/bin/env node
import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { program } from "commander";
import { version } from "../package.json";
import { login } from "./commands/login";
import { logout } from "./commands/logout";
import { show as identityShow } from "./commands/identity/show";
import { create as identityCreate } from "./commands/identity/create";
import { list as soulNameList } from "./commands/soul-name/list";
import { create as soulNameCreate } from "./commands/soul-name/create";
import { burn as soulNameBurn } from "./commands/soul-name/burn";
import { config } from "./utils/storage";

clear();
console.log(
  chalk.red(figlet.textSync("Masa CLI", { horizontalLayout: "full" }))
);

program.version(version).description("An example CLI for ordering pizza's");

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
  .description("Creates a new soul name")
  .action(async (key: string, value: any) => {
    config.set(key, value);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
