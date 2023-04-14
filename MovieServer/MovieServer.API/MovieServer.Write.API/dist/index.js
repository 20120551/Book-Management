"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
// config dotenv
dotenv_1.default.config();
const Bootstrap_1 = require("@Write/Api/Bootstrap");
const inversify_config_1 = require("./inversify.config");
(async () => {
    const app = await (0, Bootstrap_1.Bootstrap)(Bootstrap_1.container, inversify_config_1.referenceDataIoCModule);
})();
