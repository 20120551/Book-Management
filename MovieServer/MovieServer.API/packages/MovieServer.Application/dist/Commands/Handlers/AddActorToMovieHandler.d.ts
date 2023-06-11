import { ICommandHandler, IPublisher } from "@movie/shared";
import { AddActorToMovie } from "../../Commands";
import { IActorRepo, IMovieRepo, IMovieFactory } from "@movie/domain";
export type IAddActorToMovieHandler = ICommandHandler<AddActorToMovie>;
export default class AddActorToMovieHandler implements IAddActorToMovieHandler {
    private readonly _movieRepo;
    private readonly _movieFactory;
    private readonly _actorRepo;
    private readonly _publisher;
    /**
     * constructor
     */
    constructor(movieRepo: IMovieRepo, actorRepo: IActorRepo, movieFactory: IMovieFactory, publisher: IPublisher);
    HandleAsync(command: AddActorToMovie): Promise<any>;
}
