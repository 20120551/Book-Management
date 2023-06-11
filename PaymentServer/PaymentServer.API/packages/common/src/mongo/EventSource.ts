import { Collection, Db, MongoClient } from "mongodb";
import { IEvent } from "../event/IEvent";
import { Injectable, Unmanaged } from "../ioc";
import { IEventSource } from "./IEventSource";
import { EventDescriptor } from "../event/EventDescriptor";
import { Message } from "../event/Message";
import { EventEmitter } from "events";

@Injectable
export class EventSource implements IEventSource {
    private readonly _eventCollection: Collection<EventDescriptor>;
    private readonly _messageCollection: Collection<Message>;
    private readonly _mongoClient: MongoClient;
    private readonly _eventEmiter: EventEmitter;
    constructor(
        @Unmanaged eventEmiter: EventEmitter,
        @Unmanaged mongoClient: MongoClient,
        @Unmanaged db: Db,
        @Unmanaged name: string,
    ) {
        this._eventEmiter = eventEmiter;
        this._eventCollection = db.collection(name);
        this._messageCollection = db.collection("message");
        this._mongoClient = mongoClient;
    }
    async create(aggregationId: string, events: IEvent[], version: number): Promise<void> {
        const session = this._mongoClient.startSession();
        try {
            session.startTransaction();

            const lastEvent = await this.findLast(aggregationId);

            // error config
            if (lastEvent && lastEvent.version !== version && version !== -1) {
                throw new Error();
            }

            const messages: Message[] = [];
            await Promise.all(events.map((event) => {
                version++;
                event.version = version;

                const message = Message.create(event.aggregationId, event.aggregationName, event);
                messages.push(message);

                const eventDescriptor = EventDescriptor.create(event);
                return this._eventCollection.insertOne(eventDescriptor);
            }));

            await Promise.all(messages.map(message => {
                return this._messageCollection.insertOne(message);
            }));

            this._eventEmiter.emit("message_changed");

            await session.commitTransaction();
        } catch (err) {
            await session.abortTransaction();
            throw err;
        }
    }

    async delete(aggregationId: string): Promise<void> {
        await this._eventCollection.deleteMany({ aggregationId });
    }

    async findById(aggregationId: string): Promise<IEvent[] | null> {
        return await this._eventCollection
            .find({ aggregationId }).toArray();
    }

    private async findLast(aggregationId: string): Promise<IEvent> {
        const [event] = await this._eventCollection
            .find({ aggregationId })
            .sort({ version: -1 }).toArray();

        return event;
    }
}