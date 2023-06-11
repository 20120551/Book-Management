import { IErrorMiddleware, Injectable, MovieException } from "@movie/shared";
import express from 'express';

@Injectable
export default class ErrorHandlingMiddleware implements IErrorMiddleware {
    public InvokeAsync(err: any, req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        console.error(`
            ----------------------------------
            EXCEPTION MIDDLEWARE
            HTTP ${req.method} ${req.url}
            ${err.message}
            ${err.stack}
            ----------------------------------
            `);
        if (err instanceof MovieException) {
            res.status(400).json({ message: err.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
        return Promise.resolve();
    }

}