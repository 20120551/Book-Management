import { inject } from "inversify";
import { TYPES } from "./Type";

export const ReadDbClient = inject(TYPES.ReadDbClient);
export const WriteDbClient = inject(TYPES.WriteDbClient);
export const MovieRepo = inject(TYPES.MovieRepo);
export const ActorRepo = inject(TYPES.ActorRepo);
export const MovieFactory = inject(TYPES.MovieFactory);
export const CartRepo = inject(TYPES.CartRepo);
export const CartFactory = inject(TYPES.CartFactory);


export const AddActorToMovieHandler = inject(TYPES.AddActorToMovieHandler);
export const CreateMovieHandler = inject(TYPES.CreateMovieHandler);
export const RemoveActorFromMovieHandler = inject(TYPES.RemoveActorFromMovieHandler);
export const RemoveMovieHandler = inject(TYPES.RemoveMovieHandler);
export const UpdateMovieHandler = inject(TYPES.UpdateMovieHandler);
export const CreateCartHandler = inject(TYPES.CreateCartHandler);
export const RemoveCartHandler = inject(TYPES.RemoveCartHandler);
export const RemoveMovieFromCartHandler = inject(TYPES.RemoveMovieFromCartHandler);
export const UpdateMovieFromCartHandler = inject(TYPES.UpdateMovieFromCartHandler);
export const AddMovieToCartHandler = inject(TYPES.AddMovieToCartHandler);

export const GetMovieHandler = inject(TYPES.GetMovieHandler);
export const GetMoviesHandler = inject(TYPES.GetMoviesHandler);
export const SearchMovieHandler = inject(TYPES.SearchMovieHandler);
export const GetCartHandler = inject(TYPES.GetCartHandler);

export const ActorAddedEventHandler = inject(TYPES.ActorAddedEventHandler);
export const ActorRemovedEventHandler = inject(TYPES.ActorRemovedEventHandler);
export const MovieCreatedEventHandler = inject(TYPES.MovieCreatedEventHandler);
export const MovieUpdatedEventHandler = inject(TYPES.MovieUpdatedEventHandler);
export const MovieRemovedEventHandler = inject(TYPES.MovieRemovedEventHandler);


export const Mapper = inject(TYPES.Mapper);

// amqp
export const AmqpClient = inject(TYPES.AmqpClient);
export const Publisher = inject(TYPES.Publisher);
export const Consumer = inject(TYPES.Consumer);

// service collection
export const InversifyContainer = inject(TYPES.InversifyContainer);
export const CommandDispatcher = inject(TYPES.CommandDispatcher);

export const QueryDispatcher = inject(TYPES.QueryDispatcher);

// cache service
export const CacheDbClient = inject(TYPES.CacheDbClient);
export const CacheService = inject(TYPES.CacheService);

