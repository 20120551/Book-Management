"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceDataIoCModule = void 0;
const inversify_1 = require("@Shared/Lib/inversify");
//import type
const IoC_1 = require("@Shared/IoC");
//import broker
const Broker_1 = require("@Infrastructure/Broker");
//import query handler
const Handler_1 = require("@Infrastructure/Read/Queries/Handler");
const Handlers_1 = require("@Application/Queries/Handlers");
const Events_1 = require("@Infrastructure/Read/Queries/Events");
// Infrastructure & Utils
// import { RegisterController } from "@Shared/IoC/Utils";
require("@Read/Api/Controllers");
const Middleware_1 = require("@Read/Api/Middleware");
const Queries_1 = require("@Shared/Dispatcher/Queries");
const Repositories_1 = require("@Infrastructure/Shared/Repositories");
const Services_1 = require("@Infrastructure/Shared/Services");
const AutoMapper_1 = require("@Shared/AutoMapper");
const Profiles_1 = require("@Application/Profiles");
const core_1 = require("@Shared/Lib/@automapper/core");
exports.referenceDataIoCModule = new inversify_1.ContainerModule((bind) => {
    // add controller
    // RegisterController(bind, MovieController);
    // add mapper
    (0, core_1.addProfile)(AutoMapper_1.mapper, Profiles_1.CartProfile.CreateMap);
    bind(IoC_1.TYPES.Mapper)
        .toConstantValue(AutoMapper_1.mapper);
    // add consumer
    bind(IoC_1.TYPES.Consumer)
        .to(Broker_1.Consumer).inSingletonScope();
    bind(IoC_1.TYPES.Middleware)
        .to(Middleware_1.ErrorHandlingMiddleware).inSingletonScope().whenTargetNamed("ErrorHandlingMiddleware");
    bind(IoC_1.TYPES.Middleware)
        .to(Middleware_1.RequestLoggingMiddleware).inSingletonScope().whenTargetNamed("RequestLoggingMiddleware");
    // add event handler
    bind(IoC_1.TYPES.MovieCreatedEventHandler)
        .to(Events_1.MovieCreatedEventHandler).inSingletonScope();
    bind(IoC_1.TYPES.MovieUpdatedEventHandler)
        .to(Events_1.MovieUpdatedEventHandler).inSingletonScope();
    bind(IoC_1.TYPES.MovieRemovedEventHandler)
        .to(Events_1.MovieRemovedEventHandler).inSingletonScope();
    bind(IoC_1.TYPES.ActorAddedEventHandler)
        .to(Events_1.ActorAddedEventHandler).inSingletonScope();
    bind(IoC_1.TYPES.ActorRemovedEventHandler)
        .to(Events_1.ActorRemovedEventHandler).inSingletonScope();
    bind(IoC_1.TYPES.GetCartHandler)
        .to(Handlers_1.GetCartHandler).inSingletonScope();
    // add repo
    bind(IoC_1.TYPES.CartRepo)
        .to(Repositories_1.CartRepo).inSingletonScope();
    bind(IoC_1.TYPES.CacheService)
        .to(Services_1.CacheService).inSingletonScope();
    // inject background job
    // add query handler
    bind(IoC_1.TYPES.GetMovieHandler)
        .to(Handler_1.GetMovieHandler).inSingletonScope();
    bind(IoC_1.TYPES.GetMoviesHandler)
        .to(Handler_1.GetMoviesHandler).inSingletonScope();
    bind(IoC_1.TYPES.SearchMovieHandler)
        .to(Handler_1.SearchMovieHandler).inSingletonScope();
    // add dispatcher
    bind(IoC_1.TYPES.QueryDispatcher)
        .to(Queries_1.QueryDispatcher).inSingletonScope();
});
