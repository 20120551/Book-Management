import { Container, ContainerModule } from "@Shared/Lib/inversify";
import { InversifyExpressServer } from "@Shared/Lib/inversify-express-utils";
import { DbClient, GetDatabaseClient } from "@Infrastructure/Read/Queries";
import { dbConfig, env } from "@Read/Api/Configs";
import { AMQPConnection, GetAmqpClient } from "@Infrastructure/Broker";
import { TYPES } from "@Shared/IoC";
import express from "express";
import { ErrorHandlingMiddleware, RequestLoggingMiddleware } from "@Read/Api/Middleware";

export async function Bootstrap(
    container: Container,
    ...modules: ContainerModule[]
) {
    if (container.isBound(TYPES.App) === false) {
        // get database 
        const dbClient = await GetDatabaseClient(dbConfig);
        container.bind<DbClient>(TYPES.ReadDbClient).toConstantValue(dbClient);

        // get amqp client
        const amqpClient = await GetAmqpClient(env.AMQP_URL!);
        container.bind<AMQPConnection>(TYPES.AmqpClient).toConstantValue(amqpClient);

        // reload module
        container.load(...modules);

        container.bind<Container>(TYPES.InversifyContainer).toConstantValue(container);

        //config express server
        const server = new InversifyExpressServer(container);

        server.setConfig((app) => {
            // pipeline
            app.use(express.json());
            // middleware
            //resolve middleware
            app.use(container.resolve(RequestLoggingMiddleware).InvokeAsync);
        });

        server.setErrorConfig((app) => {
            // do something
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