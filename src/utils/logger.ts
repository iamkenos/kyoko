import callsites from "callsites";
import chalk from "chalk";
import log from "loglevel";
import prefix from "loglevel-plugin-prefix";

const COLORS = {
  TRACE: chalk.cyan,
  DEBUG: chalk.green,
  INFO: chalk.cyanBright,
  WARN: chalk.yellow,
  ERROR: chalk.red
};

export class Logger {
  logger: log.Logger;

  constructor(name: string, level: log.LogLevelDesc) {
    this.applyFormatter();
    return this.init(name, level);
  }

  private applyFormatter(): void {
    prefix.reg(log);
    prefix.apply(log, {
      timestampFormatter(date) {
        return date.toISOString();
      },
      format(level, _, timestamp) {
        const { CUCUMBER_WORKER_ID = "" } = process.env;
        const caller = callsites()[2];
        const widPrefix = CUCUMBER_WORKER_ID ? `[${CUCUMBER_WORKER_ID}] ` : "";
        const file = caller.toString();
        const func = caller.getFunctionName();
        const fn = func ? ` ${file.substring(0, file.indexOf("(")).trim()}:` : "";
        return `${chalk.gray(widPrefix + timestamp)} ${COLORS[level.toUpperCase()](level)}${chalk.magenta(fn)}`;
      }
    });
  }

  private init(name: string, level: log.LogLevelDesc) {
    this.logger = log.getLogger(name);
    this.logger.setLevel(level);
    return this;
  }
}
