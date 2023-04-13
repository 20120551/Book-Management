import { ICommandDispatcher } from "@Shared/Dispatcher/Commands";
import express from "express";
export default class MovieController {
    private readonly _commandDispatcher;
    constructor(commandDispatcher: ICommandDispatcher);
    Create(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    Update(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    Delete(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    AddActor(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    RemoveActor(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
//# sourceMappingURL=MovieController.d.ts.map