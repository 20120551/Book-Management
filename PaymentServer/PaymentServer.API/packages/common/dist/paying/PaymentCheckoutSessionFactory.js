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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentCheckoutSessionFactory = void 0;
const ioc_1 = require("../ioc");
const stripe_1 = require("stripe");
const PaypalCheckoutSession_1 = require("./PaypalCheckoutSession");
const StripeCheckoutSession_1 = require("./StripeCheckoutSession");
let PaymentCheckoutSessionFactory = exports.PaymentCheckoutSessionFactory = class PaymentCheckoutSessionFactory {
    _stripe;
    constructor(_stripe) {
        this._stripe = _stripe;
    }
    create(payMethod) {
        switch (payMethod) {
            case "paypal":
                return new PaypalCheckoutSession_1.PaypalCheckoutSession();
            case "stripe":
                return new StripeCheckoutSession_1.StripeCheckoutSession(this._stripe);
        }
    }
};
exports.PaymentCheckoutSessionFactory = PaymentCheckoutSessionFactory = __decorate([
    ioc_1.Injectable,
    __param(0, ioc_1.StripeClient),
    __metadata("design:paramtypes", [stripe_1.Stripe])
], PaymentCheckoutSessionFactory);
