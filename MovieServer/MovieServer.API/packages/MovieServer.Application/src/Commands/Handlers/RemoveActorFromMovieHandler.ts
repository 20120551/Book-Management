
import { ActorRepo, AutoMapper, ICommandHandler, IPublisher, Injectable, Mapper, MovieFactory, MovieRepo, Publisher } from "@movie/shared";
import { IActorRepo, IMovieFactory, IMovieRepo, MovieId } from "@movie/domain";
import RemoveActorFromMovie from "../RemoveActorFromMovie";
import { NotFoundMovieException, NotFoundActorException } from "../../Exceptions";
import { ActorRemoved } from "../../Queries/Events";

export type IRemoveActorFromMovieHandler = ICommandHandler<RemoveActorFromMovie>;

@Injectable
export default class RemoveActorFromMovieHandler implements IRemoveActorFromMovieHandler {
    private readonly _movieRepo: IMovieRepo;
    private readonly _movieFactory: IMovieFactory;
    private readonly _actorRepo: IActorRepo;
    private readonly _mapper: AutoMapper;
    private readonly _publisher: IPublisher;
    /**
     * constructor
     */
    constructor(
        @MovieRepo movieRepo: IMovieRepo,
        @ActorRepo actorRepo: IActorRepo,
        @MovieFactory movieFactory: IMovieFactory,
        @Mapper mapper: AutoMapper,
        @Publisher publisher: IPublisher
    ) {
        this._movieRepo = movieRepo;
        this._movieFactory = movieFactory;
        this._actorRepo = actorRepo;
        this._mapper = mapper;
        this._publisher = publisher;
    }

    async HandleAsync(command: RemoveActorFromMovie): Promise<any> {
        const { Id, ActorId } = command;

        const movieId = MovieId.Create(Id);
        // check movie id is existed
        const movie = await this._movieRepo.Get(movieId);
        if (movie === null) {
            throw new NotFoundMovieException();
        }

        // create new movie instance
        const _movie = this._movieFactory.Create({ ...movie });
        // add actor to movie
        const actor = await this._actorRepo.Get(parseInt(ActorId));
        if (actor === null) {
            throw new NotFoundActorException();
        }

        _movie.RemoveActor(actor);
        // save changed
        await this._actorRepo.Delete(parseInt(ActorId));

        // publish event
        const event = new ActorRemoved(Id, parseInt(ActorId));
        await this._publisher.Publish("movie", "direct", "movie.actor.removed", event);
    }

}