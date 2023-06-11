import { EventEmitter } from "events";
import { Db, MongoClient } from "mongodb";
import { DbWriteClient, IEventEmitter, IMongoClient, Injectable } from "@ioc/decorator";
import { IEventSource, EventSource } from "@payment/common";

@Injectable
export class PaymentEventSource extends EventSource implements IEventSource {
    constructor(
        @IEventEmitter eventEmitter: EventEmitter,
        @IMongoClient mongoClient: MongoClient,
        @DbWriteClient db: Db,
    ) {
        super(eventEmitter, mongoClient, db, "payment");
    }
}