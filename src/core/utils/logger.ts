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

  constructor(name: string) {
    this.applyFormatter();
    return this.getLogger(name);
  }

  private applyFormatter(): void {
    prefix.reg(log);
    prefix.apply(log, {
      nameFormatter(name) {
        return chalk.whiteBright(`${name}${process.env.CUCUMBER_PARALLEL === "true" ? `[${process.env.CUCUMBER_WORKER_ID}]` : ""}`);
      },
      timestampFormatter(date) {
        return date.toISOString();
      },
      format(level, name, timestamp) {
        const [, , , caller] = callsites();
        const stack = caller.toString();
        const from = caller.getFunctionName() || stack.substring(0, stack.indexOf("."));
        return `${chalk.gray(`${timestamp}`)} ${COLORS[level.toUpperCase()](level)} [${name}] ${chalk.yellow.bold(from)}:`;
      }
    });
  }

  private getLogger(name: string) {
    this.logger = log.getLogger(name);
    this.logger.setLevel(process.env.LOG_LEVEL as any);
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
