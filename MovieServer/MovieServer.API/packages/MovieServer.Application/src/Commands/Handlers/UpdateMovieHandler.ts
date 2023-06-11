
import { AutoMapper, ICommandHandler, IPublisher, Injectable, Mapper, MovieRepo, Publisher } from "@movie/shared";
import { IMovieRepo, Movie } from "@movie/domain";
import UpdateMovie from "../UpdateMovie";
import { NotFoundMovieException } from "../../Exceptions";
import { MovieUpdated } from "../../Queries/Events";

export type IUpdateMovieHandler = ICommandHandler<UpdateMovie>;

@Injectable
export default class UpdateMovieHandler implements IUpdateMovieHandler {
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