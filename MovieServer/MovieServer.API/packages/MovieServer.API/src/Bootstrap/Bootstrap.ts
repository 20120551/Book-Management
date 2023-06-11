import { } from "@movie/application";
import { } from "@movie/domain";
import { TYPES } from "@movie/shared";
import { AMQPConnection, CacheClient, DbClientReadSide, DbClientWriteSide, GetAmqpClient, GetCacheConnection, GetReadDatabaseClient, GetWriteDatabaseClient } from "@movie/infrastructure";
import { Container, ContainerModule } from "inversify";
import { dbReadSideConfig, dbWriteSideConfig, env, redisConfig } from "Configs";
import { InversifyExpressServer } from "inversify-express-utils";
import express from "express";
import cookieParser from "cookie-parser";
import { ErrorHandlingMiddleware, RequestLoggingMiddleware } from "Middleware";

export async function Bootstrap(
    container: Container,
    ...modules: ContainerModule[]
) {
    if (container.isBound(TYPES.App) === false) {
        // get database 
        const dbClientWriteSide = await GetWriteDatabaseClient(dbWriteSideConfig);
        container.bind<DbClientWriteSide>(TYPES.WriteDbClient).toConstantValue(dbClientWriteSide);


        const dbClientReadSide = await GetReadDatabaseClient(dbReadSideConfig);
        container.bind<DbClientReadSide>(TYPES.ReadDbClient).toConstantValue(dbClientReadSide);

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