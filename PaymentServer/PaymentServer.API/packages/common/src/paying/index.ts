import Stripe from "stripe";
import paypal from "paypal-rest-sdk";

export function createStripeConnection(apiKey: string) {
    const stripe = new Stripe(apiKey, { apiVersion: "2022-11-15" });
    return stripe;
}

export function createPaypalConnection(clientId: string, clientSecret: string, mode: string) {
    paypal.configure({ mode, client_id: clientId, client_secret: clientSecret });
}

export * from "./IPaymentCheckoutSessionFactory";
export * from "./PaymentCheckoutSessionFactory";
export * from "./CreatePaymentResource";
export * from "./PaymentResource";