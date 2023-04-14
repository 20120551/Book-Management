import { IQueryDispatcher } from "@Shared/Dispatcher/Queries";
import { interfaces } from "@Shared/Lib/inversify-express-utils";
import express from "express";
export default class CartController implements interfaces.Controller {
    private readonly _queryDispatcher;
    constructor(queryDispatcher: IQueryDispatcher);
    Get(req: express.Request, res: express.Response): Promise<express.Response<any, Record<string, any>>>;
}
//# sourceMappingURL=CartController.d.ts.map