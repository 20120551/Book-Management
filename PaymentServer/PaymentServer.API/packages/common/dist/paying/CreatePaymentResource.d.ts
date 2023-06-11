export declare class CreatePaymentResource {
    paymentId: string;
    orderId: string;
    customer: Customer;
    expirationAt: number;
    successUrl: string;
    cannelUrl: string;
    products: Product[];
    constructor(paymentId: string, orderId: string, customer: Customer, expirationAt: number, successUrl: string, cannelUrl: string);
    addProducts(products: Product[]): void;
    addProduct(product: Product): void;
}
export declare class Customer {
    id: string;
    email: string;
    constructor(id: string, email: string);
}
export declare class Product {
    name: string;
    price: number;
    quantity: number;
    constructor(name: string, price: number, quantity: number);
}
