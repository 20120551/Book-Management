import { IErrorMiddleware } from "@Shared/Middleware";
import express from 'express';
export default class ErrorHandlingMiddleware implements IErrorMiddleware {
    InvokeAsync(err: any, req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
}
//# sourceMappingURL=ErrorHandlingMiddleware.d.ts.map