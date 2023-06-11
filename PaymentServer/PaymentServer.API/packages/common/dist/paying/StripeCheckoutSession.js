"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeCheckoutSession = void 0;
const PaymentResource_1 = require("./PaymentResource");
class StripeCheckoutSession {
    _stripe;
    constructor(_stripe) {
        this._stripe = _stripe;
    }
    async create(createPaymentResource) {
        const { paymentId, orderId, cannelUrl, successUrl, customer, products, expirationAt } = createPaymentResource;
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
                };
            }),
            mode: "payment",
            success_url: successUrl,
            cancel_url: cannelUrl,
            expires_at: expirationAt,
            metadata: {
                paymentId,
                orderId
            }
        });
        return new PaymentResource_1.PaymentResource(response.url || "");
    }
}
exports.StripeCheckoutSession = StripeCheckoutSession;
