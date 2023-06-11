import { IPaymentCheckoutSession } from "./IPaymentCheckoutSession";

export interface IPaymentCheckoutSessionFactory {
    create(payMethod: "paypal" | "stripe"): IPaymentCheckoutSession;
}