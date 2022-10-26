import { Command, Option } from "commander";
import program from "./cli";

interface DocCommand {
  command: string;
  description: string;
  options: Option[];
  commands?: DocCommand[];
}

const convertCmd = (command: Command): DocCommand => {
  return {
    command: `${command.name()} ${
      command.alias() !== undefined ? command.alias() : ""
    }`.trimEnd(),
    description: command.description(),
    // @ts-ignore
    options: command.options,
    commands:
      command.commands.length > 0
        ? command.commands.map(convertCmd)
        : undefined,
  };
};

const cmds = program.commands.map(convertCmd);

for (const cmd of cmds) {
  console.log(`## \`${cmd.command}\``);
  console.log(`${cmd.description}`);

  for (const option of cmd.options) {
    console.log(`### ${option.flags}`);
    console.log(`${option.description}`);
  }

  if (cmd.commands) {
    for (const subCmd of cmd.commands) {
      console.log(`### \`${cmd.command} ${subCmd.command}\``);
      console.log(`${subCmd.description}`);

      for (const option of subCmd.options) {
        console.log("Options:");
        console.log(`- \`${option.flags}\``);
        console.log(`${option.description}`);
      }
    }
  }

  console.log("\n");
}
