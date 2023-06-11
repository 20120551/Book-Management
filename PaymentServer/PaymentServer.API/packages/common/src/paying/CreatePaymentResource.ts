export class CreatePaymentResource {
    products: Product[] = []

    constructor(
        public paymentId: string,
        public orderId: string,
        public customer: Customer,
        public expirationAt: number,
        public successUrl: string,
        public cannelUrl: string
    ) {

    }

    addProducts(products: Product[]) {
        products.forEach(product => this.addProduct(product));
    }

    addProduct(product: Product) {
        this.products.push(product);
    }
}

export class Customer {
    constructor(
        public id: string,
        public email: string
    ) {
    }
}
export class Product {
    constructor(
        public name: string,
        public price: number,
        public quantity: number
    ) {

    }
}
