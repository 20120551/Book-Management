import { IQueryDispatcher } from "@Shared/Dispatcher/Queries";
import { interfaces } from "@Shared/Lib/inversify-express-utils";
import express from "express";
export default class MovieController implements interfaces.Controller {
    private readonly _queryDispatcher;
    constructor(queryDispatcher: IQueryDispatcher);
    GetPerPage(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    Search(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
    Get(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
//# sourceMappingURL=MovieController.d.ts.map