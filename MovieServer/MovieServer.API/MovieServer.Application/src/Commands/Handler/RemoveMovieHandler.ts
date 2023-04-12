import { ICommandHandler } from "@Shared/Commands";
import { RemoveMovie } from "@Application/Commands";
import { Injectable, Mapper, MovieRepo, Publisher } from '@Shared/IoC';
import { IMovieRepo } from '@Domain/Repositories';
import { NotFoundMovieException } from "@Application/Exceptions";
import { AutoMapper } from "@Shared/AutoMapper";
import { Movie } from "@Domain/Entities";
import { IPublisher } from "@Shared/Broker";
import { MovieRemoved } from "@Application/Queries/Events";


export type IRemoveMovieHandler = ICommandHandler<RemoveMovie>;

@Injectable
export default class RemoveMovieHandler implements ICommandHandler<RemoveMovie>
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

    async HandleAsync(command: RemoveMovie): Promise<any> {
        const movieRequest = this._mapper.map(command, RemoveMovie, Movie);
        // check movie is existed
        const movie = await this._movieRepo.Get(movieRequest.Id);
        if (movie === null) {
            throw new NotFoundMovieException();
        }

        // store to database
        await this._movieRepo.Remove(movieRequest);
        // remove all actor associate with that movie
        // publish event
        const event = new MovieRemoved(command.Id);
        await this._publisher.Publish("movie", "direct", "movie.removed", event);
    }

}