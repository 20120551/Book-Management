"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaypalCheckoutSession = void 0;
const PaymentResource_1 = require("./PaymentResource");
const paypal_rest_sdk_1 = __importDefault(require("paypal-rest-sdk"));
class PaypalCheckoutSession {
    create(createPaymentResource) {
        const { paymentId, orderId, cannelUrl, successUrl, customer, products, expirationAt } = createPaymentResource;
        return new Promise((res, rej) => {
            paypal_rest_sdk_1.default.payment.create({
                intent: "sale",
                payer: {
                    payment_method: "paypal"
                },
                redirect_urls: {
                    cancel_url: cannelUrl,
                    return_url: successUrl
                },
                transactions: [{
                        item_list: {
                            items: products.map(product => {
                                return {
                                    name: product.name,
                                    sku: "item",
                                    price: product.price.toString(),
                                    quantity: product.quantity,
                                    currency: "USD"
                                };
                            })
                        },
                        amount: {
                            currency: "USD",
                            total: "1.00"
                        },
                        description: "paying products with paypal",
                        payee: {
                            email: customer.email,
                            merchant_id: customer.id
                        }
                    }]
            }, (error, payment) => {
                if (error)
                    rej(error);
                const links = payment.links;
                const link = links?.find(link => link.rel.toLowerCase().trim() === "approval_url");
                res(new PaymentResource_1.PaymentResource(link?.href || ""));
            });
        });
    }
}
exports.PaypalCheckoutSession = PaypalCheckoutSession;
