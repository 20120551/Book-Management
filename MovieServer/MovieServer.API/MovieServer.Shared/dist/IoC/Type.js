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
    AddActorToMovieHandler: Symbol("ICommandHandler<AddActorToMovie>"),
    CreateMovieHandler: Symbol("ICommandHandler<CreateMovie>"),
    RemoveActorFromMovieHandler: Symbol("ICommandHandler<RemoveActorFromMovie>"),
    RemoveMovieHandler: Symbol("ICommandHandler<RemoveMovie>"),
    UpdateMovieHandler: Symbol("ICommandHandler<UpdateMovie>"),
    //query
    GetMovieHandler: Symbol("IQueryHandler<GetMovie>"),
    GetMoviesHandler: Symbol("IQueryHandler<GetMovies>"),
    SearchMovieHandler: Symbol("IQueryHandler<SearchMovie>"),
    //event handler
    ActorAddedEventHandler: Symbol("IQueryHandler<ActorAdded>"),
    ActorRemovedEventHandler: Symbol("IQueryHandler<ActorRemoved>"),
    MovieCreatedEventHandler: Symbol("IQueryHandler<MovieCreated>"),
    MovieUpdatedEventHandler: Symbol("IQueryHandler<MovieRemoved>"),
    MovieRemovedEventHandler: Symbol("IQueryHandler<MovieUpdated>"),
    Mapper: Symbol("Mapper"),
    AmqpClient: Symbol("AmqpClient"),
    Publisher: Symbol("Publisher"),
    Consumer: Symbol("Consumer"),
    Middleware: Symbol("Middleware"),
    InversifyContainer: Symbol("InversifyContainer"),
    CommandDispatcher: Symbol("CommandDispatcher"),
    QueryDispatcher: Symbol("QueryDispatcher")
};
