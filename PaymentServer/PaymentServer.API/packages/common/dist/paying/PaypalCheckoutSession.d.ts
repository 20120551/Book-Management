import { CreatePaymentResource } from "./CreatePaymentResource";
import { IPaypalCheckoutSession } from "./IPaypalCheckoutSession";
import { PaymentResource } from "./PaymentResource";
export declare class PaypalCheckoutSession implements IPaypalCheckoutSession {
    create(createPaymentResource: CreatePaymentResource): Promise<PaymentResource>;
}
