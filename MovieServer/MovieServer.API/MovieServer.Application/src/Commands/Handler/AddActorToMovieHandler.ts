import { ICommandHandler } from "@Shared/Commands";
import { AddActorToMovie } from "@Application/Commands";
import { IActorRepo, IMovieRepo } from "@Domain/Repositories";
import { ActorRepo, Injectable, Mapper, MovieFactory, MovieRepo, Publisher } from "@Shared/IoC";
import { Actor, MovieId } from "@Domain/ValueObjects";
import { NotFoundMovieException } from "@Application/Exceptions";
import { IMovieFactory } from "@Domain/Factories";
import { AutoMapper } from "@Shared/AutoMapper";
import { MovieReadDto } from "@Application/DTO";
import { Movie } from "@Domain/Entities";
import { IPublisher } from "@Shared/Broker";
import { ActorAdded } from "@Application/Queries/Events";

export type IAddActorToMovieHandler = ICommandHandler<AddActorToMovie>;

@Injectable
export default class AddActorToMovieHandler implements IAddActorToMovieHandler {
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

    async HandleAsync(command: AddActorToMovie): Promise<any> {
        const { Id, Name, Role } = command;

        const movieId = MovieId.Create(Id);
        // check movie id is existed
        const movie = await this._movieRepo.Get(movieId);

        if (movie === null) {
            throw new NotFoundMovieException();
        }

        // create new movie instance
        const _movie = this._movieFactory.Create({ ...movie });
        // add actor to movie
        const actor = Actor.Create(Name, Role);
        _movie.AddActor(actor);

        // save changed
        const _actor = await this._actorRepo.Create(actor, movie);

        var movieReponse = this._mapper.map(_movie, Movie, MovieReadDto);

        // publish event
        const event = new ActorAdded(Id, _actor.Id, Name, Role);
        await this._publisher.Publish("movie", "direct", "movie.actor.added", event);
        return movieReponse;
    }

}