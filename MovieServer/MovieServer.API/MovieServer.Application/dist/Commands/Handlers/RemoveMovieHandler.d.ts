import { ICommandHandler } from "@Shared/Commands";
import { RemoveMovie } from "@Application/Commands";
import { IMovieRepo } from '@Domain/Repositories';
import { AutoMapper } from "@Shared/AutoMapper";
import { IPublisher } from "@Shared/Broker";
export declare type IRemoveMovieHandler = ICommandHandler<RemoveMovie>;
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
//# sourceMappingURL=RemoveMovieHandler.d.ts.map