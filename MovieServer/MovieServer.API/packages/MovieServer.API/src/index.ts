import "reflect-metadata";
import dotenv from "dotenv";
// config dotenv
dotenv.config();
import { Bootstrap, container } from "./Bootstrap";
import { referenceDataIoCModule } from "./inversify.config";
import { MessageConsumer } from "./Backgrounds";

(async () => {
    const app = await Bootstrap(container, referenceDataIoCModule);
    container.resolve(MessageConsumer).Consume();
})();