import chalk from "chalk";

const COLORS = {
    INFO: chalk.hex("#00ff20"),
    WARN: chalk.hex("#ffe200"),
    ERROR: chalk.hex("#ff2500")
};

function format(level: keyof typeof COLORS, msg: string): string {
    const color = COLORS[level];
    return `${color(`[${level}]`)} ${msg}`;
}

const log = console.log;
export const logger = {
    info: (msg: string) => log(format("INFO", msg)),
    warn: (msg: string) => log(format("WARN", msg)),
    error: (msg: string) => log(format("ERROR", msg))
};
