import { Argument, Command, Option } from "commander";
import program from "./cli";

interface DocCommand {
  command: string;
  description: string;
  options: Option[];
  arguments: Argument[];
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
    // @ts-ignore
    arguments: command._args,
    commands:
      command.commands.length > 0
        ? command.commands.map(convertCmd)
        : undefined,
  };
};

const commands = program.commands.map(convertCmd);

const formatArguments = (args: Argument[]) =>
  args
    // @ts-ignore
    .map((argument) => `<${argument._name}>`)
    .join(" ");

const listArguments = (args: Argument[]) =>
  args
    // @ts-ignore
    .map((argument) => `- \`<${argument._name}> ${argument.description}\``)
    .join("\n");

for (const command of commands) {
  console.log(
    `### \`masa ${command.command} ${formatArguments(command.arguments)}\``
  );
  console.log(`${command.description}`);
  console.log(listArguments(command.arguments));

  for (const option of command.options) {
    console.log(`- \`${option.flags}\``);
    console.log(`${option.description}`);
  }

  if (command.commands) {
    for (const subCommand of command.commands) {
      console.log(
        `\n#### \`masa ${command.command} ${
          subCommand.command
        } ${formatArguments(subCommand.arguments)}\``
      );

      console.log(`${subCommand.description}`);
      console.log(listArguments(subCommand.arguments));

      for (const option of subCommand.options) {
        console.log("Options:");
        console.log(`- \`${option.flags}\``);
        console.log(`${option.description}`);
      }
    }
  }

  console.log("\n");
}
