import { IConsumer } from "@Shared/Broker";
import { AMQPConnection } from "./AmqpClient";
export default class Consumer implements IConsumer {
    private readonly _amqpClient;
    constructor(amqpClient: AMQPConnection);
    Subscribe<THandler>(exchange: string, type: string, bindingKey: string, handler: (message: THandler) => Promise<void>): Promise<void>;
}
//# sourceMappingURL=Consumer.d.ts.map