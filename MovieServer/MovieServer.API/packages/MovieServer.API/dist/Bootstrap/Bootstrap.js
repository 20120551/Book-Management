"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bootstrap = void 0;
const shared_1 = require("@movie/shared");
const infrastructure_1 = require("@movie/infrastructure");
const Configs_1 = require("Configs");
const inversify_express_utils_1 = require("inversify-express-utils");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const Middleware_1 = require("Middleware");
async function Bootstrap(container, ...modules) {
    if (container.isBound(shared_1.TYPES.App) === false) {
        // get database 
        const dbClientWriteSide = await (0, infrastructure_1.GetWriteDatabaseClient)(Configs_1.dbWriteSideConfig);
        container.bind(shared_1.TYPES.WriteDbClient).toConstantValue(dbClientWriteSide);
        const dbClientReadSide = await (0, infrastructure_1.GetReadDatabaseClient)(Configs_1.dbReadSideConfig);
        container.bind(shared_1.TYPES.ReadDbClient).toConstantValue(dbClientReadSide);
        // get amqp client
        const amqpClient = await (0, infrastructure_1.GetAmqpClient)(Configs_1.env.AMQP_URL);
        container.bind(shared_1.TYPES.AmqpClient).toConstantValue(amqpClient);
        // get cache client
        const cacheClient = await (0, infrastructure_1.GetCacheConnection)(Configs_1.redisConfig);
        container.bind(shared_1.TYPES.CacheDbClient).toConstantValue(cacheClient);
        // reload module
        container.load(...modules);
        // inject container
        container.bind(shared_1.TYPES.InversifyContainer).toConstantValue(container);
        //config express server
        const server = new inversify_express_utils_1.InversifyExpressServer(container);
        server.setConfig((app) => {
            // pipeline
            app.use(express_1.default.json());
            // middleware
            app.use((0, cookie_parser_1.default)());
            //resolve middleware
            app.use(container.resolve(Middleware_1.RequestLoggingMiddleware).InvokeAsync);
        });
        server.setErrorConfig((app) => {
            // do something
            console.log('error here ---------');
            app.use(container.resolve(Middleware_1.ErrorHandlingMiddleware).InvokeAsync);
        });
        const app = server.build();
        var PORT = Configs_1.env.PORT;
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
        container.bind(shared_1.TYPES.App).toConstantValue(app);
        return app;
    }
    else {
        return container.get(shared_1.TYPES.App);
    }
}
exports.Bootstrap = Bootstrap;
