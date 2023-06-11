import { PayState, PayType } from "@domain/Payment";
import { Event } from "@payment/common";

export class PaymentFailedEvent extends Event {
    eventName: string = PaymentFailedEvent.name;
    aggregationName: string = "payment";

    constructor(
        aggregationId: string,
        public orderId: string,
        public payBy: string,
        public totalPrice: number,
        public payType: PayType,
        public payUrl: string,
        public state: PayState,
        public date: Date,
        public payUrlId: string,
        public message: string) {
        super(aggregationId);

    }
}