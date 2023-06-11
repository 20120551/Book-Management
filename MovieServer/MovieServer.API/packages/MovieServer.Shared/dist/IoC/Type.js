"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
exports.TYPES = {
    App: Symbol("App"),
    MovieRepo: Symbol("MovieRepo"),
    ActorRepo: Symbol("ActorRepo"),
    MovieFactory: Symbol("MovieFactory"),
    ReadDbClient: Symbol("ReadDbClient"),
    CartFactory: Symbol("CartFactory"),
    CartRepo: Symbol("CartRepo"),
    WriteDbClient: Symbol("WriteDbClient"),
    /// add handler of command and query
    //handler
    AddActorToMovieHandler: Symbol("ICommandHandler<AddActorToMovie>"),
    CreateMovieHandler: Symbol("ICommandHandler<CreateMovie>"),
    RemoveActorFromMovieHandler: Symbol("ICommandHandler<RemoveActorFromMovie>"),
    RemoveMovieHandler: Symbol("ICommandHandler<RemoveMovie>"),
    UpdateMovieHandler: Symbol("ICommandHandler<UpdateMovie>"),
    AddMovieToCartHandler: Symbol("ICommandHandler<AddMovieToCart>"),
    CreateCartHandler: Symbol("ICommandHandler<CreateCart>"),
    RemoveCartHandler: Symbol("ICommandHandler<RemoveCart>"),
    RemoveMovieFromCartHandler: Symbol("ICommandHandler<RemoveMovieFromCart>"),
    UpdateMovieFromCartHandler: Symbol("ICommandHandler<UpdateMovieFromCart>"),
    AddReceiverToCartHandler: Symbol("ICommandHandler<AddReceiverToCart>"),
    UpdateReceiverFromCartHandler: Symbol("ICommandHandler<UpdateReceiverFromCart>"),
    //query
    GetMovieHandler: Symbol("IQueryHandler<GetMovie>"),
    GetMoviesHandler: Symbol("IQueryHandler<GetMovies>"),
    SearchMovieHandler: Symbol("IQueryHandler<SearchMovie>"),
    GetCartHandler: Symbol("IQueryHandler<GetCart>"),
    //event handler
    ActorAddedEventHandler: Symbol("IQueryHandler<ActorAdded>"),
    ActorRemovedEventHandler: Symbol("IQueryHandler<ActorRemoved>"),
    MovieCreatedEventHandler: Symbol("IQueryHandler<MovieCreated>"),
    MovieUpdatedEventHandler: Symbol("IQueryHandler<MovieUpdated>"),
    MovieRemovedEventHandler: Symbol("IQueryHandler<MovieRemoved>"),
    Mapper: Symbol("Mapper"),
    AmqpClient: Symbol("AmqpClient"),
    Publisher: Symbol("Publisher"),
    Consumer: Symbol("Consumer"),
    Middleware: Symbol("Middleware"),
    InversifyContainer: Symbol("InversifyContainer"),
    CommandDispatcherModule: Symbol("CommandDispatcherModule"),
    QueryDispatcherModule: Symbol("QueryDispatcherModule"),
    // cache service
    CacheService: Symbol("CacheService"),
    CacheDbClient: Symbol("CacheDbClient"),
};
