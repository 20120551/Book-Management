"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("@movie/application");
const shared_1 = require("@movie/shared");
const MiddlewareFactory_1 = __importDefault(require("Middleware/MiddlewareFactory"));
const Middleware_1 = require("Middleware");
const inversify_express_utils_1 = require("inversify-express-utils");
const express_1 = __importDefault(require("express"));
//resolve middleware
const movieStatusMiddleware = MiddlewareFactory_1.default.Create(Middleware_1.MovieStatusMiddleware);
let CartController = class CartController {
    constructor(commandDispatcher, queryDispatcher) {
        this._queryDispatcher = queryDispatcher;
        this._commandDispatcher = commandDispatcher;
    }
    async Get(req, res) {
        const { cart_id: cartId = "" } = req.cookies;
        const query = new application_1.GetCart(cartId);
        const cart = await this._queryDispatcher.ExecuteAsync(query);
        return res.status(200).json(cart);
    }
    async Create(req, res) {
        const command = new application_1.CreateCart();
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
    async Remove(req, res) {
        const { cart_id: cartId = "" } = req.cookies;
        const command = new application_1.RemoveCart(cartId);
        await this._commandDispatcher.DispatchAsync(command);
        res.clearCookie("cart_id");
        return res.status(204).json();
    }
    async AddReceiver(req, res) {
        const { cart_id: cartId = "" } = req.cookies;
        const { FullName, PhoneNumber, Address } = req.body;
        const command = new application_1.AddReceiverToCart(cartId, FullName, PhoneNumber, Address);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "add success",
            redirect_link: "http://localhost:5001/api/cart"
        });
    }
    async UpdateReceiver(req, res) {
        const { cart_id: cartId = "" } = req.cookies;
        const { FullName, PhoneNumber, Address } = req.body;
        const command = new application_1.UpdateReceiverFromCart(cartId, FullName, PhoneNumber, Address);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "update success",
            redirect_link: "http://localhost:5001/api/cart"
        });
    }
    // middleware for checking movie status is acceptable
    async AddMovie(req, res) {
        let { cart_id: cartId = "" } = req.cookies;
        if (cartId === "") {
            const command = new application_1.CreateCart();
            await this._commandDispatcher.DispatchAsync(command);
            cartId = command.Id;
        }
        const { movieId } = req.params;
        const { Quantity, Seat } = req.body;
        const command = new application_1.AddMovieToCart(cartId, movieId, Quantity, Seat);
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
        });
    }
    async UpdateMovie(req, res) {
        const { cart_id: cartId = "" } = req.cookies;
        const { movieId } = req.params;
        const { Quantity, Seat } = req.body;
        const command = new application_1.UpdateMovieFromCart(cartId, movieId, Quantity, Seat);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "update success",
            redirect_link: "http://localhost:5001/api/cart"
        });
    }
    async RemoveMovie(req, res) {
        const { cart_id: cartId = "" } = req.cookies;
        const { movieId } = req.params;
        const command = new application_1.RemoveMovieFromCart(cartId, movieId);
        await this._commandDispatcher.DispatchAsync(command);
        return res.status(200).json({
            message: "remove success",
            redirect_link: "http://localhost:5001/api/cart"
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "Get", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "Create", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "Remove", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/receiver"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "AddReceiver", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/receiver"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "UpdateReceiver", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/:movieId", movieStatusMiddleware.CheckValidMovieActionBasedOnStatus([
        { status: "Showing" }
    ])),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "AddMovie", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:movieId"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "UpdateMovie", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:movieId"),
    __param(0, (0, inversify_express_utils_1.request)()),
    __param(1, (0, inversify_express_utils_1.response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "RemoveMovie", null);
CartController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/cart"),
    __param(0, shared_1.CommandDispatcherModule),
    __param(1, shared_1.QueryDispatcherModule),
    __metadata("design:paramtypes", [Object, Object])
], CartController);
exports.default = CartController;
