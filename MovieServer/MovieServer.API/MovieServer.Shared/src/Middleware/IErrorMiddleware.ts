import express from 'express'
export default interface IErrorMiddleware {
    InvokeAsync(err: any, req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>;
}