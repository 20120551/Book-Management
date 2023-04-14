import { ContainerModule } from "@Shared/Lib/inversify";

//import type
import { TYPES } from "@Shared/IoC";
//import repository
import { ICartFactory, IMovieFactory, MovieFactory, CartFactory } from "@Domain/Factories";
import { IActorRepo, IMovieRepo, ICartRepo } from "@Domain/Repositories";
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
    AddActorToMovieHandler,
    ICreateCartHandler,
    CreateCartHandler,
    IRemoveCartHandler,
    RemoveCartHandler,
    IAddMovieToCartHandler,
    AddMovieToCartHandler,
    UpdateMovieFromCartHandler,
    IUpdateMovieFromCartHandler,
    IRemoveMovieFromCartHandler,
    RemoveMovieFromCartHandler
} from "@Application/Commands/Handlers";

import { AutoMapper, mapper } from "@Shared/AutoMapper";
import { addProfile } from "@Shared/Lib/@automapper/core";
import { CartProfile, MovieProfile } from "@Application/Profiles";
import { IConsumer, IPublisher } from "@Shared/Broker";

// middleware
import { IErrorMiddleware, IMiddleware } from "@Shared/Middleware";
import { ErrorHandlingMiddleware, RequestLoggingMiddleware } from "@Write/Api/Middleware";

// dispatcher
import { ICommandDispatcher, CommandDispatcher } from "@Shared/Dispatcher/Commands";

// cache service
import { ICacheService, CacheService } from "@Infrastructure/Shared/Services";
import { CartRepo } from "@Infrastructure/Shared/Repositories";

import "@Write/Api/Controllers";

export const referenceDataIoCModule = new ContainerModule((bind) => {
    // add automapper
    addProfile(mapper, MovieProfile.CreateMap);
    addProfile(mapper, CartProfile.CreateMap);
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
    bind<ICartRepo>(TYPES.CartRepo)
        .to(CartRepo).inSingletonScope();

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


    bind<ICreateCartHandler>(TYPES.CreateCartHandler)
        .to(CreateCartHandler).inSingletonScope();

    bind<IRemoveCartHandler>(TYPES.RemoveCartHandler)
        .to(RemoveCartHandler).inSingletonScope();

    bind<IAddMovieToCartHandler>(TYPES.AddMovieToCartHandler)
        .to(AddMovieToCartHandler).inSingletonScope();

    bind<IUpdateMovieFromCartHandler>(TYPES.UpdateMovieFromCartHandler)
        .to(UpdateMovieFromCartHandler).inSingletonScope();

    bind<IRemoveMovieFromCartHandler>(TYPES.RemoveMovieFromCartHandler)
        .to(RemoveMovieFromCartHandler).inSingletonScope();

    //binding dispatcher
    bind<ICommandDispatcher>(TYPES.CommandDispatcher)
        .to(CommandDispatcher).inSingletonScope();

    // add factory
    bind<IMovieFactory>(TYPES.MovieFactory)
        .to(MovieFactory).inSingletonScope();

    bind<ICartFactory>(TYPES.CartFactory)
        .to(CartFactory).inSingletonScope();

    // add cache service
    bind<ICacheService>(TYPES.CacheService)
        .to(CacheService).inSingletonScope();
})

