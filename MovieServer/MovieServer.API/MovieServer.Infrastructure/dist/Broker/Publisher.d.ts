import { IPublisher } from "@Shared/Broker";
import { AMQPConnection } from "./AmqpClient";
export default class Publisher implements IPublisher {
    private readonly _amqpClient;
    constructor(amqpClient: AMQPConnection);
    Publish<TRequest>(exchange: string, type: string, routingKey: string, data: TRequest, options?: Object): Promise<void>;
}
//# sourceMappingURL=Publisher.d.ts.map