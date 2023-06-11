import { EventDescriptor, ICacheService, ICacheServiceModule, IQueryHandler } from "@payment/common/src";
import { GetPaymentQuery } from "../GetPaymentQuery";
import { Payment } from "@domain/Payment";

export class GetPaymentQueryHandler implements IQueryHandler<GetPaymentQuery, any>
{
    query: string = GetPaymentQuery.name;
    constructor(
        @ICacheServiceModule private readonly _cache: ICacheService
    ) {
    }
    async execute(query: GetPaymentQuery): Promise<any> {
        const keys = await this._cache.keys(`payment:${query.paymentId}:*`);
        const payment = new Payment();
        for (const key of keys) {
            const event = await this._cache.get(key, EventDescriptor);
            if (event) {
                payment.applyEvent(event);
            }
        }
        return payment;
    }

}