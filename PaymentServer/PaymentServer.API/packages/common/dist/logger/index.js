"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = void 0;
const winston_1 = require("winston");
const { combine, timestamp, label, prettyPrint, json } = winston_1.format;
function getLogger({ env, level }) {
    return (0, winston_1.createLogger)({
        level: level,
        format: combine(label({ label: env, }), timestamp(), prettyPrint(), json()),
        transports: [new winston_1.transports.Console()]
    });
}
exports.getLogger = getLogger;
