import { CreatePaymentResource } from "./CreatePaymentResource";
import { PaymentResource } from "./PaymentResource";
export interface IPaymentCheckoutSession {
    create(createPaymentResource: CreatePaymentResource): Promise<PaymentResource>;
}
