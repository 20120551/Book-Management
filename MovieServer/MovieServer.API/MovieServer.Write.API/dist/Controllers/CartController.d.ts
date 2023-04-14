import { ICommandDispatcher } from "@Shared/Dispatcher/Commands";
import { interfaces } from "@Shared/Lib/inversify-express-utils";
import express from "express";
export default class CartController implements interfaces.Controller {
    private readonly _commandDispatcher;
    constructor(commandDispatcher: ICommandDispatcher);
    Create(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    Remove(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    AddMovie(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    UpdateMovie(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    RemoveMovie(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
//# sourceMappingURL=CartController.d.ts.map