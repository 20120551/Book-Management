import { } from "@movie/application";
import { } from "@movie/domain";
import { IMiddleware, Injectable } from "@movie/shared";
import { } from "@movie/infrastructure";

import express from "express";

@Injectable
export default class RequestLogging implements IMiddleware {
    public InvokeAsync(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        console.log(`
    ----------------------------------
        REQUEST MIDDLEWARE
        HTTP ${req.method} ${req.url}
        ----------------------------------
        `);
        next();
        return Promise.resolve();
    }
}