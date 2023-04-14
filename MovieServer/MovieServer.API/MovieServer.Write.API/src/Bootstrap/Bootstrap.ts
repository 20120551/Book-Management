import { Container, ContainerModule } from "@Shared/Lib/inversify";
import { InversifyExpressServer } from "@Shared/Lib/inversify-express-utils";
import { DbClient, GetDatabaseClient } from "@Infrastructure/Write/Repositories";
import { AMQPConnection, GetAmqpClient } from "@Infrastructure/Broker";
import { dbConfig, env, redisConfig } from "@Write/Api/Configs";
import { TYPES } from "@Shared/IoC";
import express from "express";
import { ErrorHandlingMiddleware, RequestLoggingMiddleware } from "@Write/Api/Middleware";
import { CacheClient, GetCacheConnection } from "@Infrastructure/Shared/Repositories";
import cookieParser from "cookie-parser";

export async function Bootstrap(
    container: Container,
    ...modules: ContainerModule[]
) {
    if (container.isBound(TYPES.App) === false) {
        // get database 
        const dbClient = await GetDatabaseClient(dbConfig);
        container.bind<DbClient>(TYPES.WriteDbClient).toConstantValue(dbClient);

        // get amqp client
        const amqpClient = await GetAmqpClient(env.AMQP_URL!);
        container.bind<AMQPConnection>(TYPES.AmqpClient).toConstantValue(amqpClient);

        // get cache client
        const cacheClient = await GetCacheConnection(redisConfig);
        container.bind<CacheClient>(TYPES.CacheDbClient).toConstantValue(cacheClient);

        // reload module
        container.load(...modules);

        // inject container
        container.bind<Container>(TYPES.InversifyContainer).toConstantValue(container);
        //config express server
        const server = new InversifyExpressServer(container);

        server.setConfig((app) => {
            // pipeline
            app.use(express.json());
            // middleware
            app.use(cookieParser());
            //resolve middleware
            app.use(container.resolve(RequestLoggingMiddleware).InvokeAsync);
        });

        server.setErrorConfig((app) => {
            // do something
            console.log('error here ---------');
            app.use(container.resolve(ErrorHandlingMiddleware).InvokeAsync);
        });

        const app = server.build();
        var PORT = env.PORT;
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });

        container.bind<express.Application>(TYPES.App).toConstantValue(app);

        return app;
    } else {
        return container.get<express.Application>(TYPES.App);
    }
}