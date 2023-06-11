import { AddActorToMovieHandler, AddMovieToCartHandler, AddReceiverToCartHandler, CartProfile, CreateCartHandler, CreateMovieHandler, IAddActorToMovieHandler, IAddMovieToCartHandler, IAddReceiverToCartHandler, ICreateCartHandler, ICreateMovieHandler, IRemoveActorFromMovieHandler, IRemoveCartHandler, IRemoveMovieFromCartHandler, IRemoveMovieHandler, IUpdateMovieFromCartHandler, IUpdateMovieHandler, IUpdateReceiverFromCartHandler, MovieProfile, RemoveActorFromMovieHandler, RemoveCartHandler, RemoveMovieFromCartHandler, RemoveMovieHandler, UpdateMovieFromCartHandler, UpdateMovieHandler, UpdateReceiverFromCartHandler } from "@movie/application";
import { CartFactory, IActorRepo, ICartFactory, ICartRepo, IMovieFactory, IMovieRepo, MovieFactory } from "@movie/domain";
import { AutoMapper, CommandDispatcher, ICommandDispatcher, IConsumer, IErrorMiddleware, IMiddleware, IPublisher, IQueryDispatcher, QueryDispatcher, TYPES, mapper } from "@movie/shared";
import { ActorAddedEventHandler, ActorRemovedEventHandler, ActorRepo, CacheService, CartRepo, Consumer, GetMovieHandler, GetMoviesHandler, IActorAddedEventHandler, IActorRemovedEventHandler, ICacheService, IGetMovieHandler, IGetMoviesHandler, IMovieCreatedEventHandler, IMovieRemovedEventHandler, IMovieUpdatedEventHandler, ISearchMovieHandler, MovieCreatedEventHandler, MovieRemovedEventHandler, MovieRepo, MovieUpdatedEventHandler, Publisher, SearchMovieHandler } from "@movie/infrastructure";
import "./Controllers";
import { ContainerModule } from "inversify";
import { addProfile } from "@automapper/core";
import { ErrorHandlingMiddleware, RequestLoggingMiddleware } from "Middleware";

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

    bind<IAddReceiverToCartHandler>(TYPES.AddReceiverToCartHandler)
        .to(AddReceiverToCartHandler).inSingletonScope();

    bind<IUpdateReceiverFromCartHandler>(TYPES.UpdateReceiverFromCartHandler)
        .to(UpdateReceiverFromCartHandler).inSingletonScope();

    // add event handler
    bind<IMovieCreatedEventHandler>(TYPES.MovieCreatedEventHandler)
        .to(MovieCreatedEventHandler).inSingletonScope();
    bind<IMovieUpdatedEventHandler>(TYPES.MovieUpdatedEventHandler)
        .to(MovieUpdatedEventHandler).inSingletonScope();
    bind<IMovieRemovedEventHandler>(TYPES.MovieRemovedEventHandler)
        .to(MovieRemovedEventHandler).inSingletonScope();
    bind<IActorAddedEventHandler>(TYPES.ActorAddedEventHandler)
        .to(ActorAddedEventHandler).inSingletonScope();
    bind<IActorRemovedEventHandler>(TYPES.ActorRemovedEventHandler)
        .to(ActorRemovedEventHandler).inSingletonScope();

    // add query handler
    bind<IGetMovieHandler>(TYPES.GetMovieHandler)
        .to(GetMovieHandler).inSingletonScope();

    bind<IGetMoviesHandler>(TYPES.GetMoviesHandler)
        .to(GetMoviesHandler).inSingletonScope();

    bind<ISearchMovieHandler>(TYPES.SearchMovieHandler)
        .to(SearchMovieHandler).inSingletonScope();

    // add dispatcher
    bind<IQueryDispatcher>(TYPES.QueryDispatcherModule)
        .to(QueryDispatcher).inSingletonScope();

    //binding dispatcher
    bind<ICommandDispatcher>(TYPES.CommandDispatcherModule)
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

