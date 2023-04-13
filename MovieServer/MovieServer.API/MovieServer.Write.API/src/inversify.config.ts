import { ContainerModule } from "@Shared/Lib/inversify";

//import type
import { TYPES } from "@Shared/IoC";
//import repository
import { IMovieFactory, MovieFactory } from "@Domain/Factories";
import { IActorRepo, IMovieRepo } from "@Domain/Repositories";
import { MovieRepo, ActorRepo } from "@Infrastructure/Write/Repositories";

//import broker
import { Publisher, Consumer } from "@Infrastructure/Broker";

//import command handler
import {
    ICreateMovieHandler,
    IUpdateMovieHandler,
    IRemoveMovieHandler,
    IRemoveActorFromMovieHandler,
    IAddActorToMovieHandler,

    CreateMovieHandler,
    UpdateMovieHandler,
    RemoveMovieHandler,
    RemoveActorFromMovieHandler,
    AddActorToMovieHandler
} from "@Application/Commands/Handler";

//
import "@Write/Api/Controllers";
import { AutoMapper, mapper } from "@Shared/AutoMapper";
import { addProfile } from "@Shared/Lib/@automapper/core";
import { MovieProfile } from "@Application/Profiles";
import { IConsumer, IPublisher } from "@Shared/Broker";

// middleware
import { IErrorMiddleware, IMiddleware } from "@Shared/Middleware";
import { ErrorHandlingMiddleware, RequestLoggingMiddleware } from "@Write/Api/Middleware";

// dispatcher
import { ICommandDispatcher, CommandDispatcher } from "@Shared/Dispatcher/Commands";

export const referenceDataIoCModule = new ContainerModule((bind) => {
    // add automapper
    addProfile(mapper, MovieProfile.CreateMap);
    bind<AutoMapper>(TYPES.Mapper)
        .toConstantValue(mapper);

    // add middleware
    bind<IErrorMiddleware>(TYPES.Middleware)
        .to(ErrorHandlingMiddleware).inSingletonScope();
    bind<IMiddleware>(TYPES.Middleware)
        .to(RequestLoggingMiddleware).inSingletonScope();

    // binding message broker
    bind<IPublisher>(TYPES.Publisher)
        .to(Publisher).inSingletonScope();
    bind<IConsumer>(TYPES.Consumer)
        .to(Consumer).inSingletonScope();

    // add repository
    bind<IActorRepo>(TYPES.ActorRepo)
        .to(ActorRepo).inSingletonScope();
    bind<IMovieRepo>(TYPES.MovieRepo)
        .to(MovieRepo).inSingletonScope();

    // add command handler
    bind<ICreateMovieHandler>(TYPES.CreateMovieHandler)
        .to(CreateMovieHandler).inSingletonScope();

    bind<IAddActorToMovieHandler>(TYPES.AddActorToMovieHandler)
        .to(AddActorToMovieHandler).inSingletonScope();

    bind<IRemoveActorFromMovieHandler>(TYPES.RemoveActorFromMovieHandler)
        .to(RemoveActorFromMovieHandler).inSingletonScope();

    bind<IRemoveMovieHandler>(TYPES.RemoveMovieHandler)
        .to(RemoveMovieHandler).inSingletonScope();

    bind<IUpdateMovieHandler>(TYPES.UpdateMovieHandler)
        .to(UpdateMovieHandler).inSingletonScope();

    //binding dispatcher
    bind<ICommandDispatcher>(TYPES.CommandDispatcher)
        .to(CommandDispatcher).inSingletonScope();

    // add factory
    bind<IMovieFactory>(TYPES.MovieFactory)
        .to(MovieFactory).inSingletonScope();
})

