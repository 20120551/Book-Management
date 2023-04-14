import "reflect-metadata";
import dotenv from 'dotenv';
// config dotenv
dotenv.config();
import { Bootstrap, container } from "@Write/Api/Bootstrap";
import { referenceDataIoCModule } from "./inversify.config";

(async () => {
    const app = await Bootstrap(container, referenceDataIoCModule);
})();