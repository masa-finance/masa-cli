/* eslint-disable @typescript-eslint/ban-ts-comment */
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

const escape = (input: string) => {
  input = input.replace(/&/g, "&amp;");
  input = input.replace(/</g, "&lt;");
  input = input.replace(/>/g, "&gt;");
  return input;
};

const printDetails = (command: DocCommand) => {
  console.log(`${escape(command.description)}`);
  console.log(listArguments(command.arguments));

  for (const option of command.options) {
    console.log("Options:");
    console.log(`- \`${option.flags}\``);
    console.log(`${option.description}`);
  }
};

const printSubCommand = (command: DocCommand, subCommand: DocCommand) => {
  console.log(
    `\n#### \`masa ${`${command.command} ${
      subCommand.command
    } ${formatArguments(subCommand.arguments)}`.trimEnd()}\``,
  );

  printDetails(subCommand);
};

const printSubSubCommand = (
  command: DocCommand,
  subCommand: DocCommand,
  subSubCommand: DocCommand,
) => {
  console.log(
    `\n##### \`masa ${`${command.command} ${subCommand.command} ${
      subSubCommand.command
    } ${formatArguments(subSubCommand.arguments)}`.trimEnd()}\``,
  );

  printDetails(subSubCommand);
};

for (const command of commands) {
  console.log(
    `### \`masa ${`${command.command} ${formatArguments(
      command.arguments,
    )}`.trimEnd()}\``,
  );
  console.log(`${escape(command.description)}`);
  console.log(listArguments(command.arguments));

  for (const option of command.options) {
    console.log(`- \`${option.flags}\``);
    console.log(`${option.description}`);
  }

  if (command.commands) {
    for (const subCommand of command.commands) {
      printSubCommand(command, subCommand);

      if (subCommand.commands) {
        for (const subSubCommand of subCommand.commands) {
          printSubSubCommand(command, subCommand, subSubCommand);
        }
      }
    }
  }

  console.log("\n");
}
