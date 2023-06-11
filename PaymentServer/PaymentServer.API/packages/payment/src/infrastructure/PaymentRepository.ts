import { IPaymentRepository } from "@domain/IPaymentRepository";
import { Payment } from "@domain/Payment";
import { IEventSource, Repository } from "@payment/common";
import { IPaymentEventStoreModule, Injectable } from "@ioc/decorator";

@Injectable
export class PaymentRepository extends Repository<Payment> implements IPaymentRepository {
    constructor(
        @IPaymentEventStoreModule eventSource: IEventSource
    ) {
        super(eventSource, Payment);
    }
}