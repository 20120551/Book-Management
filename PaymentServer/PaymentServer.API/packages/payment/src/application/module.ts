

export class OrderResponse {
    constructor(
        public Id: string,
        public TotalPrice: number,
        public Receiver: { Fullname: string, Address: string, PhoneNumer: string },
        public Movies: { Id: string, Name: string, Quantity: number, Price: number }[]
    ) {
    }
}

export class ConsulServiceAuthentication {
    constructor(
        public authenticated: boolean,
        public userId: string,
        public roles: string[],
        public operators: string[]) {

    }
}