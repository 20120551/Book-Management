import {
    MovieCreated,
    MovieRemoved,
    MovieUpdated,
    ActorAdded,
    ActorRemoved
} from "@Application/Queries/Events";
import {
    IActorAddedEventHandler,
    IActorRemovedEventHandler,
    IMovieCreatedEventHandler,
    IMovieRemovedEventHandler,
    IMovieUpdatedEventHandler
} from "@Infrastructure/Read/Queries/Events";
import { IConsumer } from "@Shared/Broker";
import {
    ActorAddedEventHandler,
    ActorRemovedEventHandler,
    Consumer,
    Injectable,
    MovieCreatedEventHandler,
    MovieRemovedEventHandler,
    MovieUpdatedEventHandler
} from "@Shared/IoC";

@Injectable
export default class MessageConsumer {
    private readonly _actorAddedEventHandler: IActorAddedEventHandler;
    private readonly _actorRemovedEventHandler: IActorRemovedEventHandler;
    private readonly _movieCreatedEventHandler: IMovieCreatedEventHandler;
    private readonly _movieRemovedEventHandler: IMovieRemovedEventHandler;
    private readonly _movieUpdatedEventHandler: IMovieUpdatedEventHandler;
    private readonly _consumer: IConsumer;
    constructor(
        @Consumer consumer: IConsumer,
        @ActorAddedEventHandler actorAddedEventHandler: IActorAddedEventHandler,
        @ActorRemovedEventHandler actorRemovedEventHandler: IActorRemovedEventHandler,
        @MovieCreatedEventHandler movieCreatedEventHandler: IMovieCreatedEventHandler,
        @MovieUpdatedEventHandler movieUpdatedEventHandler: IMovieUpdatedEventHandler,
        @MovieRemovedEventHandler movieRemovedEventHandler: IMovieRemovedEventHandler,
    ) {
        this._actorAddedEventHandler = actorAddedEventHandler;
        this._actorRemovedEventHandler = actorRemovedEventHandler;
        this._movieCreatedEventHandler = movieCreatedEventHandler;
        this._movieRemovedEventHandler = movieRemovedEventHandler;
        this._movieUpdatedEventHandler = movieUpdatedEventHandler;
        this._consumer = consumer;
    }

    public async Consume(): Promise<void> {
        try {
            await this._consumer.Subscribe<MovieCreated>(
                "movie",
                "direct",
                "movie.created",
                this._movieCreatedEventHandler.HandleAsync);

            await this._consumer.Subscribe<MovieRemoved>(
                "movie",
                "direct",
                "movie.removed",
                this._movieRemovedEventHandler.HandleAsync);

            await this._consumer.Subscribe<MovieUpdated>(
                "movie",
                "direct",
                "movie.updated",
                this._movieUpdatedEventHandler.HandleAsync);

            await this._consumer.Subscribe<ActorAdded>(
                "movie",
                "direct",
                "movie.actor.added",
                this._actorAddedEventHandler.HandleAsync);

            await this._consumer.Subscribe<ActorRemoved>(
                "movie",
                "direct",
                "movie.actor.removed",
                this._actorRemovedEventHandler.HandleAsync);

        } catch (err) {
            console.log(`error when trying to handle event ${err}`);
        }
    }
}