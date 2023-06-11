import { IEvent } from "./IEvent";
export declare class Message {
    id: string;
    exchange: string;
    data: IEvent;
    status: boolean;
    private constructor();
    markAsRead(): void;
    static create(id: string, exchange: string, data: IEvent): Message;
}
