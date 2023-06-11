"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceDataIoCModule = void 0;
const application_1 = require("@movie/application");
const domain_1 = require("@movie/domain");
const shared_1 = require("@movie/shared");
const infrastructure_1 = require("@movie/infrastructure");
require("./Controllers");
const inversify_1 = require("inversify");
const core_1 = require("@automapper/core");
const Middleware_1 = require("Middleware");
exports.referenceDataIoCModule = new inversify_1.ContainerModule((bind) => {
    // add automapper
    (0, core_1.addProfile)(shared_1.mapper, application_1.MovieProfile.CreateMap);
    (0, core_1.addProfile)(shared_1.mapper, application_1.CartProfile.CreateMap);
    bind(shared_1.TYPES.Mapper)
        .toConstantValue(shared_1.mapper);
    // add middleware
    bind(shared_1.TYPES.Middleware)
        .to(Middleware_1.ErrorHandlingMiddleware).inSingletonScope();
    bind(shared_1.TYPES.Middleware)
        .to(Middleware_1.RequestLoggingMiddleware).inSingletonScope();
    // binding message broker
    bind(shared_1.TYPES.Publisher)
        .to(infrastructure_1.Publisher).inSingletonScope();
    bind(shared_1.TYPES.Consumer)
        .to(infrastructure_1.Consumer).inSingletonScope();
    // add repository
    bind(shared_1.TYPES.ActorRepo)
        .to(infrastructure_1.ActorRepo).inSingletonScope();
    bind(shared_1.TYPES.MovieRepo)
        .to(infrastructure_1.MovieRepo).inSingletonScope();
    bind(shared_1.TYPES.CartRepo)
        .to(infrastructure_1.CartRepo).inSingletonScope();
    // add command handler
    bind(shared_1.TYPES.CreateMovieHandler)
        .to(application_1.CreateMovieHandler).inSingletonScope();
    bind(shared_1.TYPES.AddActorToMovieHandler)
        .to(application_1.AddActorToMovieHandler).inSingletonScope();
    bind(shared_1.TYPES.RemoveActorFromMovieHandler)
        .to(application_1.RemoveActorFromMovieHandler).inSingletonScope();
    bind(shared_1.TYPES.RemoveMovieHandler)
        .to(application_1.RemoveMovieHandler).inSingletonScope();
    bind(shared_1.TYPES.UpdateMovieHandler)
        .to(application_1.UpdateMovieHandler).inSingletonScope();
    bind(shared_1.TYPES.CreateCartHandler)
        .to(application_1.CreateCartHandler).inSingletonScope();
    bind(shared_1.TYPES.RemoveCartHandler)
        .to(application_1.RemoveCartHandler).inSingletonScope();
    bind(shared_1.TYPES.AddMovieToCartHandler)
        .to(application_1.AddMovieToCartHandler).inSingletonScope();
    bind(shared_1.TYPES.UpdateMovieFromCartHandler)
        .to(application_1.UpdateMovieFromCartHandler).inSingletonScope();
    bind(shared_1.TYPES.RemoveMovieFromCartHandler)
        .to(application_1.RemoveMovieFromCartHandler).inSingletonScope();
    bind(shared_1.TYPES.AddReceiverToCartHandler)
        .to(application_1.AddReceiverToCartHandler).inSingletonScope();
    bind(shared_1.TYPES.UpdateReceiverFromCartHandler)
        .to(application_1.UpdateReceiverFromCartHandler).inSingletonScope();
    // add event handler
    bind(shared_1.TYPES.MovieCreatedEventHandler)
        .to(infrastructure_1.MovieCreatedEventHandler).inSingletonScope();
    bind(shared_1.TYPES.MovieUpdatedEventHandler)
        .to(infrastructure_1.MovieUpdatedEventHandler).inSingletonScope();
    bind(shared_1.TYPES.MovieRemovedEventHandler)
        .to(infrastructure_1.MovieRemovedEventHandler).inSingletonScope();
    bind(shared_1.TYPES.ActorAddedEventHandler)
        .to(infrastructure_1.ActorAddedEventHandler).inSingletonScope();
    bind(shared_1.TYPES.ActorRemovedEventHandler)
        .to(infrastructure_1.ActorRemovedEventHandler).inSingletonScope();
    // add query handler
    bind(shared_1.TYPES.GetMovieHandler)
        .to(infrastructure_1.GetMovieHandler).inSingletonScope();
    bind(shared_1.TYPES.GetMoviesHandler)
        .to(infrastructure_1.GetMoviesHandler).inSingletonScope();
    bind(shared_1.TYPES.SearchMovieHandler)
        .to(infrastructure_1.SearchMovieHandler).inSingletonScope();
    // add dispatcher
    bind(shared_1.TYPES.QueryDispatcherModule)
        .to(shared_1.QueryDispatcher).inSingletonScope();
    //binding dispatcher
    bind(shared_1.TYPES.CommandDispatcherModule)
        .to(shared_1.CommandDispatcher).inSingletonScope();
    // add factory
    bind(shared_1.TYPES.MovieFactory)
        .to(domain_1.MovieFactory).inSingletonScope();
    bind(shared_1.TYPES.CartFactory)
        .to(domain_1.CartFactory).inSingletonScope();
    // add cache service
    bind(shared_1.TYPES.CacheService)
        .to(infrastructure_1.CacheService).inSingletonScope();
});
