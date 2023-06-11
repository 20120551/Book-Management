import { IActorAddedEventHandler } from "./ActorAddedEventHandler";
import { IActorRemovedEventHandler } from "./ActorRemovedEventHandler";
import { IMovieCreatedEventHandler } from "./MovieCreatedEventHandler";
import { IMovieUpdatedEventHandler } from "./MovieUpdatedEventHandler";
import { IMovieRemovedEventHandler } from "./MovieRemovedEventHandler";

export { default as ActorAddedEventHandler } from "./ActorAddedEventHandler";
export { default as ActorRemovedEventHandler } from "./ActorRemovedEventHandler";
export { default as MovieCreatedEventHandler } from "./MovieCreatedEventHandler";
export { default as MovieUpdatedEventHandler } from "./MovieUpdatedEventHandler";
export { default as MovieRemovedEventHandler } from "./MovieRemovedEventHandler";

export {
    IActorAddedEventHandler,
    IActorRemovedEventHandler,
    IMovieCreatedEventHandler,
    IMovieUpdatedEventHandler,
    IMovieRemovedEventHandler
}