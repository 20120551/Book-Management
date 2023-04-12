import "reflect-metadata";
import dotenv from 'dotenv';
// config dotenv
dotenv.config();
import { Bootstrap } from "@Write/Api/Bootstrap";
import { Container } from '@Shared/Lib/inversify';
import { referenceDataIoCModule } from "./inversify.config";


(async () => {
    const container = new Container();
    const app = await Bootstrap(container, referenceDataIoCModule);
})();
