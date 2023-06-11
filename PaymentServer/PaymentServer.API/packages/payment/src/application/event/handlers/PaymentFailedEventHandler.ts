import { PaymentFailedEvent } from "@domain/event";
import { ICacheService, ICacheServiceModule, IEventHandler } from "@payment/common/src";

export class PaymentFailedEventHandler implements IEventHandler<PaymentFailedEvent>
{
    event: string = PaymentFailedEvent.name;
    constructor(
        @ICacheServiceModule private readonly _cache: ICacheService
    ) {
    }

    async Handle(event: PaymentFailedEvent): Promise<void> {
        const ttl = 20 * 24 * 3600 * 1000;
        await this._cache.set<PaymentFailedEvent>(`payment:${event.aggregationId}:${event.version}`, event, ttl);
    }

}