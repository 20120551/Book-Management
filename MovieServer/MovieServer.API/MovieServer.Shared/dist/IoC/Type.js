"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
exports.TYPES = {
    App: Symbol("App"),
    MovieRepo: Symbol("MovieRepo"),
    ActorRepo: Symbol("ActorRepo"),
    MovieFactory: Symbol("MovieFactory"),
    ReadDbClient: Symbol("ReadDbClient"),
    WriteDbClient: Symbol("WriteDbClient"),
    /// add handler of command and query
    //handler
    AddActorToMovieHandler: Symbol("AddActorToMovieHandler"),
    CreateMovieHandler: Symbol("CreateMovieHandler"),
    RemoveActorFromMovieHandler: Symbol("RemoveActorFromMovieHandler"),
    RemoveMovieHandler: Symbol("RemoveMovieHandler"),
    UpdateMovieHandler: Symbol("UpdateMovieHandler"),
    //query
    GetMovieHandler: Symbol("GetMovieHandler"),
    GetMoviesHandler: Symbol("GetMoviesHandler"),
    SearchMovieHandler: Symbol("SearchMovieHandler"),
    //event handler
    ActorAddedEventHandler: Symbol("ActorAddedEventHandler"),
    ActorRemovedEventHandler: Symbol("ActorRemovedEventHandler"),
    MovieCreatedEventHandler: Symbol("MovieCreatedEventHandler"),
    MovieUpdatedEventHandler: Symbol("MovieUpdatedEventHandler"),
    MovieRemovedEventHandler: Symbol("MovieRemovedEventHandler"),
    Mapper: Symbol("Mapper"),
    AmqpClient: Symbol("AmqpClient"),
    Publisher: Symbol("Publisher"),
    Consumer: Symbol("Consumer"),
    Middleware: Symbol("Middleware")
};
