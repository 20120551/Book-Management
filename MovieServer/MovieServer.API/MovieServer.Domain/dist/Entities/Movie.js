"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Events_1 = require("@Domain/Events");
const Exceptions_1 = require("@Domain/Exceptions");
const Domain_1 = require("@Shared/Domain");
class Movie extends Domain_1.Aggregation {
    //constructor
    /**
     * constructor
     */
    constructor(
    //id
    Id, 
    //name
    Name, 
    //status
    Status, 
    //price
    Slot, 
    //price
    Price, 
    //localization
    Localization) {
        super();
        this.Id = Id;
        this.Name = Name;
        this.Status = Status;
        this.Slot = Slot;
        this.Price = Price;
        this.Localization = Localization;
        //list of actor
        this.Actors = [];
    }
    // get actor
    GetActor(name) {
        // get actor by actor name
        var actors = this.Actors.filter(a => a.Name === name);
        // throw exception if name is not appear on actor list
        if (actors.length === 0) {
            throw new Exceptions_1.NotFoundActorException(name);
        }
        // return result
        return actors;
    }
    // add actor
    AddActor(actor) {
        // check if actor is duplicate
        var index = this.Actors.findIndex(a => (a.Name.toLowerCase() === actor.Name.toLowerCase()
            && a.Role.toLowerCase() === actor.Role.toLowerCase()));
        if (index !== -1) {
            throw new Exceptions_1.ActorAlreadyExistException(actor);
        }
        // return result
        this.AddEvent(new Events_1.ActorAdded(this, actor));
        this.Actors.push(actor);
    }
    // add actors
    AddActors(actors) {
        for (var actor of actors) {
            this.AddActor(actor);
        }
    }
    // remove actor
    RemoveActor(actor) {
        // check if actor is duplicate
        var index = this.Actors.findIndex(a => (a.Name.toLowerCase() === actor.Name.toLowerCase()
            && a.Role.toLowerCase() === actor.Role.toLowerCase()));
        if (index === -1) {
            throw new Exceptions_1.NotFoundActorException(actor.Name);
        }
        // return result
        this.Actors.splice(index, 1);
        this.AddEvent(new Events_1.ActorDeleted(this, actor));
    }
}
exports.default = Movie;
