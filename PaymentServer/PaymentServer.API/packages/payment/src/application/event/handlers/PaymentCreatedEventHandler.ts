import { PaymentCreatedEvent } from "@domain/event";
import { ICacheService, ICacheServiceModule, IEventHandler } from "@payment/common/src";

export class PaymentCreatedEventHandler implements IEventHandler<PaymentCreatedEvent>
{
    event: string = PaymentCreatedEvent.name;
    constructor(
        @ICacheServiceModule private readonly _cache: ICacheService
    ) {
    }

    async Handle(event: PaymentCreatedEvent): Promise<void> {
        const ttl = 20 * 24 * 3600 * 1000;
        await this._cache.set<PaymentCreatedEvent>(`payment:${event.aggregationId}:${event.version}`, event, ttl);
    }

}