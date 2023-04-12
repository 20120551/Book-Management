import "reflect-metadata";
import dotenv from 'dotenv';
// config dotenv
dotenv.config();
import { Bootstrap } from "@Read/Api/Bootstrap";
import { Container } from '@Shared/Lib/inversify';
import { referenceDataIoCModule } from "./inversify.config";
import { MessageConsumer } from "./Backgrounds";


(async () => {
    const container = new Container();
    const app = await Bootstrap(container, referenceDataIoCModule);
    await container.resolve(MessageConsumer).Consume();
})();
