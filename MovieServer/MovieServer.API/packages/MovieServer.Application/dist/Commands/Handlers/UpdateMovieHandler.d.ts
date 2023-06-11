import { AutoMapper, ICommandHandler, IPublisher } from "@movie/shared";
import { IMovieRepo } from "@movie/domain";
import UpdateMovie from "../UpdateMovie";
export type IUpdateMovieHandler = ICommandHandler<UpdateMovie>;
export default class UpdateMovieHandler implements IUpdateMovieHandler {
    private readonly _movieRepo;
    private readonly _mapper;
    private readonly _publisher;
    /**
     * constructor
     */
    constructor(movieRepo: IMovieRepo, mapper: AutoMapper, publisher: IPublisher);
    HandleAsync(command: UpdateMovie): Promise<any>;
}
