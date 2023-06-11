import { ICacheService, ICacheServiceModule, IQueryHandler } from "@payment/common";
import { GetPaymentsQuery } from "../GetPaymentsQuery";
import { EventDescriptor } from "@payment/common";
import { Payment } from "@domain/Payment";

export class GetPaymentsQueryHandler implements IQueryHandler<GetPaymentsQuery, any>
{
    query: string = GetPaymentsQuery.name;
    constructor(
        @ICacheServiceModule private readonly _cache: ICacheService
    ) {
    }
    async execute(query: GetPaymentsQuery): Promise<any> {
        const keys = await this._cache.keys("payment:*");

        const events: EventDescriptor[] = []
        for (const key of keys) {
            const event = await this._cache.get<EventDescriptor>(key, EventDescriptor);
            if (event) {
                events.push(event);
            }
        }


        const payments: Payment[] = [];
        for (const event of events) {
            const index = payments.findIndex(payment => payment.guid === event.aggregationId);
            if (index !== -1) {
                payments[index].applyEvent(event);
            } else {
                const payment = new Payment();
                payment.applyEvent(event);
                payments.push(payment);
            }
        }

        return payments;
    }

}