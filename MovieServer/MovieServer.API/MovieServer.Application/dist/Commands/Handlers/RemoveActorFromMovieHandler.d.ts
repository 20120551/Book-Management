import { ICommandHandler } from "@Shared/Commands";
import { RemoveActorFromMovie } from "@Application/Commands";
import { IActorRepo, IMovieRepo } from "@Domain/Repositories";
import { IMovieFactory } from "@Domain/Factories";
import { AutoMapper } from "@Shared/AutoMapper";
import { IPublisher } from "@Shared/Broker";
export declare type IRemoveActorFromMovieHandler = ICommandHandler<RemoveActorFromMovie>;
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
//# sourceMappingURL=RemoveActorFromMovieHandler.d.ts.map