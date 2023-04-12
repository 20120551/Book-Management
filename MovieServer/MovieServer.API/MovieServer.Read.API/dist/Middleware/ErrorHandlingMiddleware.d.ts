import { IMiddleware } from "@Shared/Middleware";
import express from 'express';
export default class ErrorHandlingMiddleware implements IMiddleware {
    InvokeAsync(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
}
//# sourceMappingURL=ErrorHandlingMiddleware.d.ts.map