import { ICommandHandler } from "@Shared/Commands";
import { CreateMovie } from "@Application/Commands";
import { IMovieRepo } from '@Domain/Repositories';
import { AutoMapper } from "@Shared/AutoMapper";
import { IPublisher } from "@Shared/Broker";
export declare type ICreateMovieHandler = ICommandHandler<CreateMovie>;
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
//# sourceMappingURL=CreateMovieHandler.d.ts.map