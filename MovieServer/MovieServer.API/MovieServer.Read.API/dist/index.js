"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
// config dotenv
dotenv_1.default.config();
const Bootstrap_1 = require("@Read/Api/Bootstrap");
const inversify_1 = require("@Shared/Lib/inversify");
const inversify_config_1 = require("./inversify.config");
const Backgrounds_1 = require("./Backgrounds");
(async () => {
    const container = new inversify_1.Container();
    const app = await (0, Bootstrap_1.Bootstrap)(container, inversify_config_1.referenceDataIoCModule);
    await container.resolve(Backgrounds_1.MessageConsumer).Consume();
})();
