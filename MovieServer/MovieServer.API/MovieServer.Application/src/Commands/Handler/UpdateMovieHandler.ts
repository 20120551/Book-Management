import { ICommandHandler } from "@Shared/Commands";
import { UpdateMovie } from "@Application/Commands";
import { MovieRepo, Injectable, Mapper, Publisher } from '@Shared/IoC';
import { IMovieRepo } from '@Domain/Repositories';
import { NotFoundMovieException } from "@Application/Exceptions";
import { AutoMapper } from "@Shared/AutoMapper";
import { Movie } from "@Domain/Entities";
import { IPublisher } from "@Shared/Broker";
import { MovieUpdated } from "@Application/Queries/Events";

export type IUpdateMovieHandler = ICommandHandler<UpdateMovie>;

@Injectable
export default class UpdateMovieHandler implements ICommandHandler<UpdateMovie>
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

    async HandleAsync(command: UpdateMovie): Promise<any> {
        const { Id, Name, Status, Slot, Price, Localization } = command;
        const movieRequest = this._mapper.map(command, UpdateMovie, Movie);

        // check movie is existed
        const movie = await this._movieRepo.Get(movieRequest.Id);
        if (movie === null) {
            throw new NotFoundMovieException();
        }

        // store to database
        await this._movieRepo.Update(movieRequest);
        // publish event
        const event = new MovieUpdated(Id, Name, Status, Slot, Price, Localization);
        await this._publisher.Publish("movie", "direct", "movie.updated", event);
    }

}