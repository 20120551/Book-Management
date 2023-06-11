import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, prettyPrint, json } = format;

export type LoggerOptions = {
    env: string,
    level: string
}

export function getLogger({ env, level }: LoggerOptions) {
    return createLogger({
        level: level,
        format: combine(
            label({ label: env, }),
            timestamp(),
            prettyPrint(),
            json()
        ),
        transports: [new transports.Console()]
    })
}