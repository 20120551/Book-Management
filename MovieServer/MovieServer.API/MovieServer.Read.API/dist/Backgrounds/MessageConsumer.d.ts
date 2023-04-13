import { IConsumer } from "@Shared/Broker";
import { IQueryDispatcher } from "@Shared/Dispatcher/Queries";
export default class MessageConsumer {
    private readonly _queryDispatcher;
    private readonly _consumer;
    constructor(queryDispatcher: IQueryDispatcher, consumer: IConsumer);
    Consume(): Promise<void>;
}
//# sourceMappingURL=MessageConsumer.d.ts.map