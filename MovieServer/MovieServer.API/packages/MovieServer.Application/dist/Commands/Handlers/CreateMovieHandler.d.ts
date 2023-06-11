import { AutoMapper, ICommandHandler, IPublisher } from "@movie/shared";
import { IMovieRepo } from "@movie/domain";
import CreateMovie from "../CreateMovie";
export type ICreateMovieHandler = ICommandHandler<CreateMovie>;
export default class CreateMovieHandler implements ICreateMovieHandler {
    private readonly _movieRepo;
    private readonly _mapper;
    private readonly _publisher;
    /**
     * constructor
     */
    constructor(movieRepo: IMovieRepo, mapper: AutoMapper, publisher: IPublisher);
    HandleAsync(command: CreateMovie): Promise<any>;
}
