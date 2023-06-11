export type OrderService = {
    serviceName: string,
    serviceProtocal: string
}

export type PaymentService = {
    serviceName: string,
    serviceProtocal: string,
    serviceAddress: string,
    servicePort: number
}

export const order: OrderService = {
    serviceName: process.env.ORDER_SERVICE_NAME!,
    serviceProtocal: process.env.ORDER_SERVICE_PROTOCAL!
}

export const payment: PaymentService = {
    serviceName: process.env.PAYMENT_SERVICE_NAME!,
    serviceProtocal: process.env.PAYMENT_SERVICE_PROTOCAL!,
    serviceAddress: process.env.PAYMENT_SERVICE_ADDRESS!,
    servicePort: parseInt(process.env.PAYMENT_SERVICE_PORT!),
}