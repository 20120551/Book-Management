import { AddMovieToCart, AddReceiverToCart, CreateCart, GetCart, RemoveCart, RemoveMovieFromCart, UpdateMovieFromCart, UpdateReceiverFromCart } from "@movie/application";
import { } from "@movie/domain";
import { CommandDispatcherModule, ICommandDispatcher, IQueryDispatcher, QueryDispatcherModule } from "@movie/shared";
import { } from "@movie/infrastructure";
import MiddlewareFactory from "Middleware/MiddlewareFactory";
import { MovieStatusMiddleware } from "Middleware";
import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import express from "express";

//resolve middleware
const movieStatusMiddleware = MiddlewareFactory.Create<MovieStatusMiddleware>(MovieStatusMiddleware);

@controller("/api/cart")
export default class CartController implements interfaces.Controller {
    private readonly _queryDispatcher: IQueryDispatcher;
    private readonly _commandDispatcher: ICommandDispatcher;
    constructor(
        @CommandDispatcherModule commandDispatcher: ICommandDispatcher,
        @QueryDispatcherModule queryDispatcher: IQueryDispatcher
    ) {
        this._queryDispatcher = queryDispatcher;
        this._commandDispatcher = commandDispatcher;
    }

    @httpGet("/")
    public async Get(@request() req: express.Request, @response() res: express.Response) {
        const { cart_id: cartId = "" } = req.cookies;
        const query = new GetCart(cartId);

        const cart = await this._queryDispatcher.ExecuteAsync(query);
        return res.status(200).json(cart);
    }

    @httpPost("/")
    public async Create(@request() req: express.Request, @response() res: express.Response) {
        const command = new CreateCart();
        await this._commandDispatcher.DispatchAsync(command);
        // store cart into cookie
        const expireIn = new Date();
        expireIn.setTime(expireIn.getTime() + 24 * 60 * 60 * 1000);
        res.cookie("cart_id", command.Id, {
            httpOnly: true,
            secure: false,
            expires: expireIn
        });

        return res.status(201).json({
            message: "create cart success",
            redirect_link: "http://localhost:5001/api/cart"
        });
    }

    @httpDelete("/")
    public async Remove(@request() req: express.Request, @response() res: express.Response) {
        const { cart_id: cartId = "" } = req.cookies;
        const command = new RemoveCart(cartId);
        await this._commandDispatcher.DispatchAsync(command);
        res.clearCookie("cart_id");
        return res.status(204).json();
    }



    @httpPost("/receiver")
    public async AddReceiver(@request() req: express.Request, @response() res: express.Response) {
        const { cart_id: cartId = "" } = req.cookies;
        const { FullName, PhoneNumber, Address } = req.body;
        const command = new AddReceiverToCart(cartId, FullName, PhoneNumber, Address);

        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "add success",
            redirect_link: "http://localhost:5001/api/cart"
        })
    }

    @httpPut("/receiver")
    public async UpdateReceiver(@request() req: express.Request, @response() res: express.Response) {
        const { cart_id: cartId = "" } = req.cookies;
        const { FullName, PhoneNumber, Address } = req.body;
        const command = new UpdateReceiverFromCart(cartId, FullName, PhoneNumber, Address);

        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "update success",
            redirect_link: "http://localhost:5001/api/cart"
        })
    }

    // middleware for checking movie status is acceptable
    @httpPost("/:movieId",
        movieStatusMiddleware.CheckValidMovieActionBasedOnStatus([
            { status: "Showing" }
        ])
    )
    public async AddMovie(@request() req: express.Request, @response() res: express.Response) {
        let { cart_id: cartId = "" } = req.cookies;
        if (cartId === "") {
            const command = new CreateCart();
            await this._commandDispatcher.DispatchAsync(command);
            cartId = command.Id;
        }
        const { movieId } = req.params;
        const { Quantity, Seat } = req.body;
        const command = new AddMovieToCart(cartId, movieId, Quantity, Seat);

        await this._commandDispatcher.DispatchAsync(command);

        const expireIn = new Date();
        expireIn.setTime(expireIn.getTime() + 24 * 60 * 60 * 1000);
        res.cookie("cart_id", command.Id, {
            httpOnly: true,
            secure: false,
            expires: expireIn
        });

        return res.status(200).json({
            message: "add success",
            redirect_link: "http://localhost:5001/api/cart"
        })
    }

    @httpPut("/:movieId")
    public async UpdateMovie(@request() req: express.Request, @response() res: express.Response) {
        const { cart_id: cartId = "" } = req.cookies;
        const { movieId } = req.params;
        const { Quantity, Seat } = req.body;
        const command = new UpdateMovieFromCart(cartId, movieId, Quantity, Seat);

        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "update success",
            redirect_link: "http://localhost:5001/api/cart"
        })
    }

    @httpDelete("/:movieId")
    public async RemoveMovie(@request() req: express.Request, @response() res: express.Response) {
        const { cart_id: cartId = "" } = req.cookies;
        const { movieId } = req.params;
        const command = new RemoveMovieFromCart(cartId, movieId);


        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "remove success",
            redirect_link: "http://localhost:5001/api/cart"
        })
    }
}
