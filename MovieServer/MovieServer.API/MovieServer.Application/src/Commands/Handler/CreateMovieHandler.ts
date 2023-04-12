import { ICommandHandler } from "@Shared/Commands";
import { CreateMovie } from "@Application/Commands";
import { MovieRepo, Injectable, Mapper, Publisher } from '@Shared/IoC';
import { IMovieRepo } from '@Domain/Repositories';
import { Movie } from "@Domain/Entities";
import { AutoMapper } from "@Shared/AutoMapper";
import { MovieReadDto } from "@Application/DTO";
import { IPublisher } from "@Shared/Broker";
import { MovieCreated } from "@Application/Queries/Events";

export type ICreateMovieHandler = ICommandHandler<CreateMovie>;

@Injectable
export default class CreateMovieHandler implements ICommandHandler<CreateMovie>
{
    private readonly _movieRepo: IMovieRepo;
    private readonly _mapper: AutoMapper;
    private readonly _publisher: IPublisher;
    /**
     * constructor
     */
    constructor(
        @MovieRepo movieRepo: IMovieRepo,
        @Mapper mapper: AutoMapper,
        @Publisher publisher: IPublisher
    ) {
        this._movieRepo = movieRepo;
        this._mapper = mapper;
        this._publisher = publisher;
    }

    async HandleAsync(command: CreateMovie): Promise<any> {
        const { Id, Name, Status, Slot, Price, Localization } = command;
        const movieRequest = this._mapper.map(command, CreateMovie, Movie);
        // store to database
        const _movie = await this._movieRepo.Create(movieRequest);
        const movieResponse = this._mapper.map(_movie, Movie, MovieReadDto);

        // publishing event
        const event = new MovieCreated(Id, Name, Status, Slot, Price, Localization);
        await this._publisher.Publish("movie", "direct", "movie.created", event);

        return movieResponse;
    }

}