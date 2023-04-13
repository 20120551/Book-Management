import { ContainerModule } from "@Shared/Lib/inversify";

//import type
import { TYPES } from "@Shared/IoC";

//import broker
import { Consumer } from "@Infrastructure/Broker";

//import query handler
import {
    IGetMovieHandler,
    IGetMoviesHandler,
    ISearchMovieHandler,

    GetMovieHandler,
    GetMoviesHandler,
    SearchMovieHandler,
} from "@Infrastructure/Read/Queries/Handler";

import {
    IMovieCreatedEventHandler,
    IMovieRemovedEventHandler,
    IMovieUpdatedEventHandler,
    IActorAddedEventHandler,
    IActorRemovedEventHandler,

    ActorRemovedEventHandler,
    ActorAddedEventHandler,
    MovieCreatedEventHandler,
    MovieRemovedEventHandler,
    MovieUpdatedEventHandler,
} from "@Infrastructure/Read/Queries/Events";


// Infrastructure & Utils
// import { RegisterController } from "@Shared/IoC/Utils";
import "@Read/Api/Controllers";
import { IConsumer } from "@Shared/Broker";
import { IErrorMiddleware, IMiddleware } from "@Shared/Middleware";
import { ErrorHandlingMiddleware, RequestLoggingMiddleware } from "@Read/Api/Middleware";

import { IQueryDispatcher, QueryDispatcher } from "@Shared/Dispatcher/Queries";
export const referenceDataIoCModule = new ContainerModule((bind) => {
    // add controller
    // RegisterController(bind, MovieController);
    // add consumer
    bind<IConsumer>(TYPES.Consumer)
        .to(Consumer).inSingletonScope();

    bind<IErrorMiddleware>(TYPES.Middleware)
        .to(ErrorHandlingMiddleware).inSingletonScope().whenTargetNamed("ErrorHandlingMiddleware");
    bind<IMiddleware>(TYPES.Middleware)
        .to(RequestLoggingMiddleware).inSingletonScope().whenTargetNamed("RequestLoggingMiddleware");

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

    // inject background job


    // add query handler
    bind<IGetMovieHandler>(TYPES.GetMovieHandler)
        .to(GetMovieHandler).inSingletonScope();

    bind<IGetMoviesHandler>(TYPES.GetMoviesHandler)
        .to(GetMoviesHandler).inSingletonScope();

    bind<ISearchMovieHandler>(TYPES.SearchMovieHandler)
        .to(SearchMovieHandler).inSingletonScope();

    // add dispatcher
    bind<IQueryDispatcher>(TYPES.QueryDispatcher)
        .to(QueryDispatcher).inSingletonScope();
})

