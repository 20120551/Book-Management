import { ICommandHandler } from "@Shared/Commands";
import { RemoveActorFromMovie } from "@Application/Commands";
import { IActorRepo, IMovieRepo } from "@Domain/Repositories";
import { ActorRepo, Injectable, Mapper, MovieFactory, MovieRepo, Publisher } from "@Shared/IoC";
import { MovieId } from "@Domain/ValueObjects";
import { NotFoundMovieException, NotFoundActorException } from "@Application/Exceptions";
import { IMovieFactory } from "@Domain/Factories";
import { AutoMapper } from "@Shared/AutoMapper";
import { MovieReadDto } from "@Application/DTO";
import { Movie } from "@Domain/Entities";
import { IPublisher } from "@Shared/Broker";
import { ActorRemoved } from "@Application/Queries/Events";


export type IRemoveActorFromMovieHandler = ICommandHandler<RemoveActorFromMovie>;

@Injectable
export default class RemoveActorFromMovieHandler implements ICommandHandler<RemoveActorFromMovie>
{
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
        const movieResponse = this._mapper.map(_movie, Movie, MovieReadDto);

        // publish event
        const event = new ActorRemoved(Id, parseInt(ActorId));
        await this._publisher.Publish("movie", "direct", "movie.actor.removed", event);

        return movieResponse;
    }

}