import { IConsumer } from "@Shared/Broker";
import { AMQPConnection } from "./AmqpClient";
export default class Consumer implements IConsumer {
    private readonly _amqpClient;
    constructor(amqpClient: AMQPConnection);
    Subscribe<THandler>(exchange: string, type: string, bindingKey: string, handler: (data: THandler) => Promise<void | null>): Promise<void>;
}
//# sourceMappingURL=Consumer.d.ts.map