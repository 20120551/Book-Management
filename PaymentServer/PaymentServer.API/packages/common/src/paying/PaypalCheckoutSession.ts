import { CreatePaymentResource } from "./CreatePaymentResource";
import { IPaypalCheckoutSession } from "./IPaypalCheckoutSession";
import { PaymentResource } from "./PaymentResource";
import paypal from "paypal-rest-sdk";

export class PaypalCheckoutSession implements IPaypalCheckoutSession {
    create(createPaymentResource: CreatePaymentResource): Promise<PaymentResource> {
        const {
            paymentId, orderId, cannelUrl,
            successUrl, customer, products, expirationAt } = createPaymentResource;
        return new Promise((res, rej) => {
            paypal.payment.create({
                intent: "sale",
                payer: {
                    payment_method: "paypal"
                },
                redirect_urls: {
                    cancel_url: cannelUrl + `?paymentId=${paymentId}`,
                    return_url: successUrl + `?paymentId=${paymentId}`
                },
                transactions: [{
                    reference_id: orderId,
                    item_list: {
                        items: products.map(product => {
                            return {
                                name: product.name,
                                sku: "item",
                                price: product.price.toString(),
                                quantity: product.quantity,
                                currency: "USD"
                            }
                        })
                    },
                    amount: {
                        currency: "USD",
                        total: products.reduce((init, product) => {
                            return init + product.price * product.quantity
                        }, 0).toString()
                    },
                    description: "paying products with paypal",
                    payee: {
                        email: customer.email,
                        merchant_id: customer.id
                    }
                }]
            }, (error, payment) => {
                if (error) rej(error);
                const links = payment.links;
                const link = links?.find(link => link.rel.toLowerCase().trim() === "approval_url");
                res(new PaymentResource(payment?.id || "", link?.href || ""));
            });
        })
    }
}