import { GetCart } from "@Application/Queries";
import { IQueryDispatcher } from "@Shared/Dispatcher/Queries";
import { QueryDispatcher } from "@Shared/IoC";
import { controller, httpGet, response, request, interfaces } from "@Shared/Lib/inversify-express-utils";
import express from "express";

@controller("/api/cart")
export default class CartController implements interfaces.Controller {
    private readonly _queryDispatcher: IQueryDispatcher;

    constructor(
        @QueryDispatcher queryDispatcher: IQueryDispatcher
    ) {
        this._queryDispatcher = queryDispatcher;
    }

    @httpGet("/")
    public async Get(@request() req: express.Request, @response() res: express.Response) {
        const { cart_id: cartId = "" } = req.cookies;
        const query = new GetCart(cartId);

        const cart = await this._queryDispatcher.ExecuteAsync(query);
        return res.status(200).json(cart);
    }
}