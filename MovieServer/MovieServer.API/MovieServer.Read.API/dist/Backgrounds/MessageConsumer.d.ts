import { IActorAddedEventHandler, IActorRemovedEventHandler, IMovieCreatedEventHandler, IMovieRemovedEventHandler, IMovieUpdatedEventHandler } from "@Infrastructure/Read/Queries/Events";
import { IConsumer } from "@Shared/Broker";
export default class MessageConsumer {
    private readonly _actorAddedEventHandler;
    private readonly _actorRemovedEventHandler;
    private readonly _movieCreatedEventHandler;
    private readonly _movieRemovedEventHandler;
    private readonly _movieUpdatedEventHandler;
    private readonly _consumer;
    constructor(consumer: IConsumer, actorAddedEventHandler: IActorAddedEventHandler, actorRemovedEventHandler: IActorRemovedEventHandler, movieCreatedEventHandler: IMovieCreatedEventHandler, movieUpdatedEventHandler: IMovieUpdatedEventHandler, movieRemovedEventHandler: IMovieRemovedEventHandler);
    Consume(): Promise<void>;
}
//# sourceMappingURL=MessageConsumer.d.ts.map