import { CreatePaymentResource } from "./CreatePaymentResource";
import { IStripeCheckoutSession } from "./IStripeCheckoutSession";
import { PaymentResource } from "./PaymentResource";
import { Stripe } from "stripe";
export declare class StripeCheckoutSession implements IStripeCheckoutSession {
    private readonly _stripe;
    constructor(_stripe: Stripe);
    create(createPaymentResource: CreatePaymentResource): Promise<PaymentResource>;
}
