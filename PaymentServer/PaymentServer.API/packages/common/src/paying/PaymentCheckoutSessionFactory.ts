import { Injectable, StripeClient } from "../ioc";
import { IPaymentCheckoutSessionFactory } from "./IPaymentCheckoutSessionFactory";
import { Stripe } from "stripe";
import { PaypalCheckoutSession } from "./PaypalCheckoutSession";
import { IPaymentCheckoutSession } from "./IPaymentCheckoutSession";
import { StripeCheckoutSession } from "./StripeCheckoutSession";

@Injectable
export class PaymentCheckoutSessionFactory implements IPaymentCheckoutSessionFactory {
    constructor(
        @StripeClient private readonly _stripe: Stripe
    ) {

    }
    create(payMethod: "paypal" | "stripe"): IPaymentCheckoutSession {
        switch (payMethod) {
            case "paypal":
                return new PaypalCheckoutSession();
            case "stripe":
                return new StripeCheckoutSession(this._stripe);
        }
    }

}