import express from 'express'
export default interface IMiddleware {
    InvokeAsync(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
}