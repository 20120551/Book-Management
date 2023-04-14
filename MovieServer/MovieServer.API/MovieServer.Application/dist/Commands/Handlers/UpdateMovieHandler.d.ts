import { ICommandHandler } from "@Shared/Commands";
import { UpdateMovie } from "@Application/Commands";
import { IMovieRepo } from '@Domain/Repositories';
import { AutoMapper } from "@Shared/AutoMapper";
import { IPublisher } from "@Shared/Broker";
export declare type IUpdateMovieHandler = ICommandHandler<UpdateMovie>;
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
//# sourceMappingURL=UpdateMovieHandler.d.ts.map