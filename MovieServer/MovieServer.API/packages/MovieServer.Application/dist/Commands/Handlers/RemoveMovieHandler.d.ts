import { AutoMapper, ICommandHandler, IPublisher } from "@movie/shared";
import { IMovieRepo } from "@movie/domain";
import RemoveMovie from "../RemoveMovie";
export type IRemoveMovieHandler = ICommandHandler<RemoveMovie>;
export default class RemoveMovieHandler implements IRemoveMovieHandler {
    private readonly _movieRepo;
    private readonly _mapper;
    private readonly _publisher;
    /**
     * constructor
     */
    constructor(movieRepo: IMovieRepo, mapper: AutoMapper, publisher: IPublisher);
    HandleAsync(command: RemoveMovie): Promise<any>;
}
