import {
    MovieCreated,
    MovieRemoved,
    MovieUpdated,
    ActorAdded,
    ActorRemoved
} from "@Application/Queries/Events";
import { IConsumer } from "@Shared/Broker";
import { IQueryDispatcher } from "@Shared/Dispatcher/Queries";
import {
    Consumer,
    Injectable,
    QueryDispatcher
} from "@Shared/IoC";

@Injectable
export default class MessageConsumer {
    private readonly _queryDispatcher: IQueryDispatcher;
    private readonly _consumer: IConsumer;
    constructor(
        @QueryDispatcher queryDispatcher: IQueryDispatcher,
        @Consumer consumer: IConsumer,
    ) {

        this._consumer = consumer;
        this._queryDispatcher = queryDispatcher;
    }

    public async Consume(): Promise<void> {
        try {
            await this._consumer.Subscribe<MovieCreated>(
                "movie",
                "direct",
                "movie.created",
                async (content: MovieCreated) => {
                    const { Id, Status, Name, Slot, Price, Localization } = content;
                    const event = new MovieCreated(Id, Name, Status, Slot, Price, Localization);
                    await this._queryDispatcher.ExecuteAsync(event);
                }
            );

            await this._consumer.Subscribe<MovieRemoved>(
                "movie",
                "direct",
                "movie.removed",
                async (content: MovieRemoved) => {
                    const { Id } = content;
                    const event = new MovieRemoved(Id);
                    await this._queryDispatcher.ExecuteAsync(event);
                });

            await this._consumer.Subscribe<MovieUpdated>(
                "movie",
                "direct",
                "movie.updated",
                async (content: MovieUpdated) => {
                    const { Id, Status, Name, Slot, Price, Localization } = content;
                    const event = new MovieUpdated(Id, Name, Status, Slot, Price, Localization);
                    await this._queryDispatcher.ExecuteAsync(event);
                });

            await this._consumer.Subscribe<ActorAdded>(
                "movie",
                "direct",
                "movie.actor.added",
                async (content: ActorAdded) => {
                    const { Id, ActorId, Name, Role } = content;
                    const event = new ActorAdded(Id, ActorId, Name, Role);
                    await this._queryDispatcher.ExecuteAsync(event);
                });

            await this._consumer.Subscribe<ActorRemoved>(
                "movie",
                "direct",
                "movie.actor.removed",
                async (content: ActorRemoved) => {
                    const { Id, ActorId } = content;
                    const event = new ActorRemoved(Id, ActorId);
                    await this._queryDispatcher.ExecuteAsync(event);
                });

        } catch (err) {
            console.log(`error when trying to handle event ${err}`);
        }
    }
}