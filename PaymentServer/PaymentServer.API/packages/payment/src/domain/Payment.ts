import { AggregationRoot } from "@payment/common";
import { PaymentCreatedEvent } from "./event/PaymentCreatedEvent";
import { PaymentFailedEvent, PaymentSucceedEvent } from "./event";

export class Payment extends AggregationRoot {
    private orderId?: string;
    private payType?: PayType;
    private totalPrice?: number;
    private payBy?: string;
    private state?: PayState;
    private payUrl?: string;
    private date?: Date;
    private payUrlId?: string;

    constructor();
    constructor(
        guid: string, orderId: string, totalPrice: number,
        payType: PayType, state: PayState, payUrl: string, payBy: string,
        date: Date, payUrlId: string);

    constructor(
        guid?: string, orderId?: string,
        totalPrice?: number, payType?: PayType,
        state?: PayState, payUrl?: string,
        payBy?: string, date?: Date, payUrlId?: string) {
        super(guid);
        if (guid && orderId && totalPrice && payType && state && payUrl && payBy && date && payUrlId) {
            this.orderId = orderId;
            this.totalPrice = totalPrice;
            this.payBy = payBy;
            this.totalPrice = totalPrice;
            this.state = state;
            this.payUrl = payUrl;
            this.date = date;
            this.payUrlId = payUrlId;

            // publish event
            this.applyEvent(
                new PaymentCreatedEvent(this.guid, orderId, payBy, totalPrice, payType, payUrl, state, date));
        }
    }

    paymentSucceeded() {
        this.state = PayState.Succeed;
        // publish event
        this.applyEvent(new PaymentSucceedEvent(this.guid, this.orderId!, this.payBy!, this.state));
    }

    paymentFail(message: string) {
        this.state = PayState.Fail;

        //public event
        this.applyEvent(new PaymentFailedEvent(this.guid, this.orderId!, this.payBy!, this.state, message));
    }
}

export enum PayType {
    Stripe = "stripe",
    Paypal = "paypal"
}

export enum PayState {
    Init = "init",
    Succeed = "success",
    Fail = "fail",
    Pending = "pending"
}