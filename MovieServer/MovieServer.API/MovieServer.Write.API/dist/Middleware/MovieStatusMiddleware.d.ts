import { IRequestMiddleware } from "@Shared/Middleware";
import express from "express";
import { Container } from "@Shared/Lib/inversify";
export default class MovieStatusMiddleware implements IRequestMiddleware {
    private readonly _container;
    constructor(container: Container);
    CheckValidMovieActionBasedOnStatus(args: {
        status: string;
    }[]): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void | express.Response<any, Record<string, any>>>;
}
//# sourceMappingURL=MovieStatusMiddleware.d.ts.map