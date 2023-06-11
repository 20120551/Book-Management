"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Customer = exports.CreatePaymentResource = void 0;
class CreatePaymentResource {
    paymentId;
    orderId;
    customer;
    expirationAt;
    successUrl;
    cannelUrl;
    products = [];
    constructor(paymentId, orderId, customer, expirationAt, successUrl, cannelUrl) {
        this.paymentId = paymentId;
        this.orderId = orderId;
        this.customer = customer;
        this.expirationAt = expirationAt;
        this.successUrl = successUrl;
        this.cannelUrl = cannelUrl;
    }
    addProducts(products) {
        products.forEach(product => this.addProduct(product));
    }
    addProduct(product) {
        this.products.push(product);
    }
}
exports.CreatePaymentResource = CreatePaymentResource;
class Customer {
    id;
    email;
    constructor(id, email) {
        this.id = id;
        this.email = email;
    }
}
exports.Customer = Customer;
class Product {
    name;
    price;
    quantity;
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}
exports.Product = Product;
