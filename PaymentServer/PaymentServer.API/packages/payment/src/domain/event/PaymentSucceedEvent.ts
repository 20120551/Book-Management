import { PayState, PayType } from "@domain/Payment";
import { Event } from "@payment/common";

export class PaymentSucceedEvent extends Event {
    eventName: string = PaymentSucceedEvent.name;
    aggregationName: string = "payment";

    constructor(aggregationId: string,
        public orderId: string,
        public payBy: string,
        public totalPrice: number,
        public payType: PayType,
        public payUrl: string,
        public state: PayState,
        public date: Date,
        public payUrlId: string) {
        super(aggregationId);

    }
}