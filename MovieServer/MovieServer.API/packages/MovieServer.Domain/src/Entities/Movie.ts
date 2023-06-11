import { ActorAdded, ActorDeleted } from "../Events";
import { ActorAlreadyExistException, NotFoundActorException } from "../Exceptions";
import { Localization, MovieId, MovieName, MoviePrice, Actor, MovieSlot, MovieStatus } from "../ValueObjects";
import { Aggregation } from "@movie/shared";

export default class Movie extends Aggregation {
    //list of actor
    public Actors: Actor[] = [];
    //constructor
    /**
     * constructor
     */
    constructor(
        //id
        public Id: MovieId,
        //name
        public Name: MovieName,
        //status
        public Status: MovieStatus,
        //price
        public Slot: MovieSlot,
        //price
        public Price: MoviePrice,
        //localization
        public Localization: Localization
    ) {
        super();
    }
    // get actor
    public GetActor(name: string): Actor[] {
        // get actor by actor name
        var actors = this.Actors.filter(a => a.Name === name);
        // throw exception if name is not appear on actor list
        if (actors.length === 0) {
            throw new NotFoundActorException(name);
        }
        // return result
        return actors;
    }
    // add actor
    public AddActor(actor: Actor): void {
        // check if actor is duplicate
        var index = this.Actors.findIndex(a => (a.Name.toLowerCase() === actor.Name.toLowerCase()
            && a.Role.toLowerCase() === actor.Role.toLowerCase()));
        if (index !== -1) {
            throw new ActorAlreadyExistException(actor);
        }
        // return result
        this.AddEvent(new ActorAdded(this, actor));
        this.Actors.push(actor);
    }
    // add actors
    public AddActors(actors: Actor[]): void {
        for (var actor of actors) {
            this.AddActor(actor);
        }
    }
    // remove actor
    public RemoveActor(actor: Actor): void {
        // check if actor is duplicate
        var index = this.Actors.findIndex(a => (a.Name.toLowerCase() === actor.Name.toLowerCase()
            && a.Role.toLowerCase() === actor.Role.toLowerCase()));
        if (index === -1) {
            throw new NotFoundActorException(actor.Name);
        }
        // return result
        this.Actors.splice(index, 1);
        this.AddEvent(new ActorDeleted(this, actor));
    }
}