"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceDataIoCModule = void 0;
const inversify_1 = require("@Shared/Lib/inversify");
//import type
const IoC_1 = require("@Shared/IoC");
//import repository
const Factories_1 = require("@Domain/Factories");
const Repositories_1 = require("@Infrastructure/Write/Repositories");
//import broker
const Broker_1 = require("@Infrastructure/Broker");
//import command handler
const Handler_1 = require("@Application/Commands/Handler");
//
require("@Write/Api/Controllers");
const AutoMapper_1 = require("@Shared/AutoMapper");
const core_1 = require("@Shared/Lib/@automapper/core");
const Profiles_1 = require("@Application/Profiles");
const Middleware_1 = require("@Write/Api/Middleware");
// dispatcher
const Commands_1 = require("@Shared/Dispatcher/Commands");
exports.referenceDataIoCModule = new inversify_1.ContainerModule((bind) => {
    // add automapper
    (0, core_1.addProfile)(AutoMapper_1.mapper, Profiles_1.MovieProfile.CreateMap);
    bind(IoC_1.TYPES.Mapper)
        .toConstantValue(AutoMapper_1.mapper);
    // add middleware
    bind(IoC_1.TYPES.Middleware)
        .to(Middleware_1.ErrorHandlingMiddleware).inSingletonScope();
    bind(IoC_1.TYPES.Middleware)
        .to(Middleware_1.RequestLoggingMiddleware).inSingletonScope();
    // binding message broker
    bind(IoC_1.TYPES.Publisher)
        .to(Broker_1.Publisher).inSingletonScope();
    bind(IoC_1.TYPES.Consumer)
        .to(Broker_1.Consumer).inSingletonScope();
    // add repository
    bind(IoC_1.TYPES.ActorRepo)
        .to(Repositories_1.ActorRepo).inSingletonScope();
    bind(IoC_1.TYPES.MovieRepo)
        .to(Repositories_1.MovieRepo).inSingletonScope();
    // add command handler
    bind(IoC_1.TYPES.CreateMovieHandler)
        .to(Handler_1.CreateMovieHandler).inSingletonScope();
    bind(IoC_1.TYPES.AddActorToMovieHandler)
        .to(Handler_1.AddActorToMovieHandler).inSingletonScope();
    bind(IoC_1.TYPES.RemoveActorFromMovieHandler)
        .to(Handler_1.RemoveActorFromMovieHandler).inSingletonScope();
    bind(IoC_1.TYPES.RemoveMovieHandler)
        .to(Handler_1.RemoveMovieHandler).inSingletonScope();
    bind(IoC_1.TYPES.UpdateMovieHandler)
        .to(Handler_1.UpdateMovieHandler).inSingletonScope();
    //binding dispatcher
    bind(IoC_1.TYPES.CommandDispatcher)
        .to(Commands_1.CommandDispatcher).inSingletonScope();
    // add factory
    bind(IoC_1.TYPES.MovieFactory)
        .to(Factories_1.MovieFactory).inSingletonScope();
});
