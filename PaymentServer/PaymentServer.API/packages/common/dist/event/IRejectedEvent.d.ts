import { IEvent } from "./IEvent";
export interface IRejectedEvent extends IEvent {
    message: string;
    reason: string;
}
