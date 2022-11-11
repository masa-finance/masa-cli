import readline from "readline";
import { stdin as input, stdout as output } from "process";

export const readLine = (question: string): Promise<string> => {
  const rl = readline.createInterface({ input, output });

  return new Promise((resolve) => {
    rl.question(question, (result) => {
      rl.close();
      return resolve(result);
    });
  });
};
