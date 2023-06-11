import Stripe from "stripe";
export declare function createStripeConnection(apiKey: string): Stripe;
export declare function createPaypalConnection(clientId: string, clientSecret: string, mode: string): void;
export * from "./IPaymentCheckoutSessionFactory";
export * from "./PaymentCheckoutSessionFactory";
export * from "./CreatePaymentResource";
export * from "./PaymentResource";
