
import { AutoMapper, ICommandHandler, IPublisher, Injectable, Mapper, MovieRepo, Publisher } from "@movie/shared";
import { IMovieRepo, MovieId } from "@movie/domain";
import RemoveMovie from "../RemoveMovie";
import { NotFoundMovieException } from "../../Exceptions";
import { MovieRemoved } from "../../Queries/Events";

export type IRemoveMovieHandler = ICommandHandler<RemoveMovie>;

@Injectable
export default class RemoveMovieHandler implements IRemoveMovieHandler {
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
        // check movie is existed
        const movie = await this._movieRepo.Get(MovieId.Create(command.Id));
        if (movie === null) {
            throw new NotFoundMovieException();
        }

        // store to database
        await this._movieRepo.Remove(movie);
        // remove all actor associate with that movie
        // publish event
        const event = new MovieRemoved(command.Id);
        await this._publisher.Publish("movie", "direct", "movie.removed", event);
    }

}