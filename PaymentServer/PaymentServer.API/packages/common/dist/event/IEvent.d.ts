import { IMessage } from "./IMessage";
export interface IEvent extends IMessage {
    eventName: string;
    aggregationId: string;
    aggregationName: string;
    version?: number;
}
