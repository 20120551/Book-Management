import { IPaymentCheckoutSessionFactory } from "./IPaymentCheckoutSessionFactory";
import { Stripe } from "stripe";
import { IPaymentCheckoutSession } from "./IPaymentCheckoutSession";
export declare class PaymentCheckoutSessionFactory implements IPaymentCheckoutSessionFactory {
    private readonly _stripe;
    constructor(_stripe: Stripe);
    create(payMethod: "paypal" | "stripe"): IPaymentCheckoutSession;
}
