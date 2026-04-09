import chalk from 'chalk';

export const log = {
  success: (msg) => console.log(chalk.green(msg)),
  info: (msg) => console.log(chalk.blueBright(msg)),
  warn: (msg) => console.warn(chalk.yellow(msg)),
  error: (msg) => console.error(chalk.red(msg)),
};
