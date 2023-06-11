/// <reference types="node" />
import { Db, MongoClient } from "mongodb";
import { IEvent } from "../event/IEvent";
import { IEventSource } from "./IEventSource";
import { EventEmitter } from "events";
export declare class EventSource implements IEventSource {
    private readonly _eventCollection;
    private readonly _messageCollection;
    private readonly _mongoClient;
    private readonly _eventEmiter;
    constructor(eventEmiter: EventEmitter, mongoClient: MongoClient, db: Db, name: string);
    create(aggregationId: string, events: IEvent[], version: number): Promise<void>;
    delete(aggregationId: string): Promise<void>;
    findById(aggregationId: string): Promise<IEvent[] | null>;
    private findLast;
}
