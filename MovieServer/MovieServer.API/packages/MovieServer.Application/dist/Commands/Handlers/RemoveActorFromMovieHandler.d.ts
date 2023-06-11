import { AutoMapper, ICommandHandler, IPublisher } from "@movie/shared";
import { IActorRepo, IMovieFactory, IMovieRepo } from "@movie/domain";
import RemoveActorFromMovie from "../RemoveActorFromMovie";
export type IRemoveActorFromMovieHandler = ICommandHandler<RemoveActorFromMovie>;
export default class RemoveActorFromMovieHandler implements IRemoveActorFromMovieHandler {
    private readonly _movieRepo;
    private readonly _movieFactory;
    private readonly _actorRepo;
    private readonly _mapper;
    private readonly _publisher;
    /**
     * constructor
     */
    constructor(movieRepo: IMovieRepo, actorRepo: IActorRepo, movieFactory: IMovieFactory, mapper: AutoMapper, publisher: IPublisher);
    HandleAsync(command: RemoveActorFromMovie): Promise<any>;
}
