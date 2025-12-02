import path from "path";
import util from "util";
import * as sourceMapSupport from "source-map-support";
import { createLogger, format, level, transports } from "winston";
import { ConsoleTransportInstance, FileTransportInstance } from "winston/lib/winston/transports";

// helps debugging in production
sourceMapSupport.install();

const ENV = process.env.NODE_ENV;
const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, ...rest } = info;
    const customMeta = util.inspect(rest, {
        showHidden: false,
        depth: null,
        colors: true
    });

    return `[${level.toUpperCase()}] : [${timestamp}] ${message}\nMETA : ${customMeta}`;
});

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, ...rest } = info;

    const logMeta: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(rest)) {
        if (value instanceof Error) {
            const { name, message, stack } = value;
            logMeta[key] = { name, message, trace: stack };
        } else {
            logMeta[key] = value;
        }
    }

    const logdata = { level: level.toUpperCase(), message, timestamp, meta: logMeta };
    return JSON.stringify(logdata, null, 4);
});

const consoleTransports = (): Array<ConsoleTransportInstance> => {
    if (ENV !== "production") {
        return [
            new transports.Console({
                level: "info",
                format: format.combine(format.timestamp(), consoleLogFormat)
            })
        ];
    }
    return [];
};
const fileTransports = (): Array<FileTransportInstance> => {
    if (ENV === "production") {
        return [];
    }
    return [
        new transports.File({
            filename: path.join(__dirname, "../../logs", `${ENV}.log`),
            level: "info",
            format: format.combine(format.timestamp(), fileLogFormat)
        })
    ];
};

export default createLogger({
    defaultMeta: {
        meta: {}
    },
    transports: [...consoleTransports(), ...fileTransports()]
});
