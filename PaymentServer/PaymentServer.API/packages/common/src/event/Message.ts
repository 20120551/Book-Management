import { IEvent } from "./IEvent";

export class Message {
    status: boolean = false;

    private constructor(
        public id: string,
        public exchange: string,
        public data: IEvent,
    ) {

    }

    markAsRead() {
        this.status = true;
    }

    public static create(id: string, exchange: string, data: IEvent) {
        return new Message(id, exchange, data);
    }
}