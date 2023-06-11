import { PaymentSucceedEvent } from "@domain/event";
import { ICacheService, ICacheServiceModule, IEventHandler } from "@payment/common/src";

export class PaymentSucceedEventHandler implements IEventHandler<PaymentSucceedEvent>
{
    event: string = PaymentSucceedEvent.name;
    constructor(
        @ICacheServiceModule private readonly _cache: ICacheService
    ) {
    }

    async Handle(event: PaymentSucceedEvent): Promise<void> {
        const ttl = 20 * 24 * 3600 * 1000;
        await this._cache.set<PaymentSucceedEvent>(`payment:${event.aggregationId}:${event.version}`, event, ttl);
    }

}