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
  private logger: log.Logger;

  constructor(name: string, level: log.LogLevelDesc) {
    this.applyFormatter();
    return this.getLogger(name, level);
  }

  private applyFormatter(): void {
    prefix.reg(log);
    prefix.apply(log, {
      timestampFormatter(date) {
        return date.toISOString();
      },
      format(level, _, timestamp) {
        const { CUCUMBER_WORKER_ID = "" } = process.env;
        const [, , , caller] = callsites();
        const widPrefix = CUCUMBER_WORKER_ID ? `[${CUCUMBER_WORKER_ID}] ` : "";
        const file = caller.toString();
        const func = caller.getFunctionName();
        const fn = func ? ` ${file.substring(0, file.indexOf("(")).trim()}:` : "";
        return `${chalk.gray(widPrefix + timestamp)} ${COLORS[level.toUpperCase()](level)}${chalk.magenta(fn)}`;
      }
    });
  }

  private getLogger(name: string, level: log.LogLevelDesc) {
    this.logger = log.getLogger(name);
    this.logger.setLevel(level);
    return this;
  }

  setLevel(...args: Parameters<log.Logger["setLevel"]>) {
    this.logger.setLevel(...args);
  }

  disableAll(...args: Parameters<log.Logger["disableAll"]>) {
    this.logger.disableAll(...args);
  }

  enableAll(...args: Parameters<log.Logger["enableAll"]>) {
    this.logger.enableAll(...args);
  }

  error(...msg: any[]) {
    this.logger.error(...msg);
  }

  warn(...msg: any[]) {
    this.logger.warn(...msg);
  }

  info(...msg: any[]) {
    this.logger.info(...msg);
  }

  debug(...msg: any[]) {
    this.logger.debug(...msg);
  }

  trace(...msg: any[]) {
    this.logger.trace(...msg);
  }
}
