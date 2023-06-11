
import { AutoMapper, ICommandHandler, IPublisher, Injectable, Mapper, MovieRepo, Publisher } from "@movie/shared";
import { IMovieRepo, Movie } from "@movie/domain";
import CreateMovie from "../CreateMovie";
import { MovieCreated } from "../../Queries/Events";

export type ICreateMovieHandler = ICommandHandler<CreateMovie>;

@Injectable
export default class CreateMovieHandler implements ICreateMovieHandler {
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
        await this._movieRepo.Create(movieRequest);

        // publishing event
        const event = new MovieCreated(Id, Name, Status, Slot, Price, Localization);
        await this._publisher.Publish("movie", "direct", "movie.created", event);
    }

}