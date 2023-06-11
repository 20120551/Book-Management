import { CreatePaymentResource } from "./CreatePaymentResource";
import { IStripeCheckoutSession } from "./IStripeCheckoutSession";
import { PaymentResource } from "./PaymentResource";
import { Stripe } from "stripe";

export class StripeCheckoutSession implements IStripeCheckoutSession {
    constructor(
        private readonly _stripe: Stripe
    ) {
    }
    async create(createPaymentResource: CreatePaymentResource): Promise<PaymentResource> {
        const {
            paymentId, orderId, cannelUrl,
            successUrl, customer, products, expirationAt } = createPaymentResource;

        const response = await this._stripe.checkout.sessions.create({
            client_reference_id: customer.id,
            customer_email: customer.email,
            line_items: products.map(product => {
                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price,
                    },
                    quantity: product.quantity
                }
            }),
            mode: "payment",
            success_url: successUrl + `?paymentId=${paymentId}`,
            cancel_url: cannelUrl + `?paymentId=${paymentId}`,
            expires_at: expirationAt,
            metadata: {
                paymentId,
                orderId
            }
        });

        return new PaymentResource(response.id, response.url || "");
    }

}