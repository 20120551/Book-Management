"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSource = void 0;
const mongodb_1 = require("mongodb");
const ioc_1 = require("../ioc");
const EventDescriptor_1 = require("../event/EventDescriptor");
const Message_1 = require("../event/Message");
const events_1 = require("events");
let EventSource = exports.EventSource = class EventSource {
    _eventCollection;
    _messageCollection;
    _mongoClient;
    _eventEmiter;
    constructor(eventEmiter, mongoClient, db, name) {
        this._eventEmiter = eventEmiter;
        this._eventCollection = db.collection(name);
        this._messageCollection = db.collection("message");
        this._mongoClient = mongoClient;
    }
    async create(aggregationId, events, version) {
        const session = this._mongoClient.startSession();
        try {
            session.startTransaction();
            const lastEvent = await this.findLast(aggregationId);
            // error config
            if (lastEvent && lastEvent.version !== version && version !== -1) {
                throw new Error();
            }
            const messages = [];
            await Promise.all(events.map((event) => {
                version++;
                event.version = version;
                const message = Message_1.Message.create(event.aggregationId, event.aggregationName, event);
                messages.push(message);
                const eventDescriptor = EventDescriptor_1.EventDescriptor.create(event);
                return this._eventCollection.insertOne(eventDescriptor);
            }));
            await Promise.all(messages.map(message => {
                return this._messageCollection.insertOne(message);
            }));
            this._eventEmiter.emit("message_changed");
            await session.commitTransaction();
        }
        catch (err) {
            await session.abortTransaction();
            throw err;
        }
    }
    async delete(aggregationId) {
        await this._eventCollection.deleteMany({ aggregationId });
    }
    async findById(aggregationId) {
        return await this._eventCollection
            .find({ aggregationId }).toArray();
    }
    async findLast(aggregationId) {
        const [event] = await this._eventCollection
            .find({ aggregationId })
            .sort({ version: -1 }).toArray();
        return event;
    }
};
exports.EventSource = EventSource = __decorate([
    ioc_1.Injectable,
    __param(0, ioc_1.Unmanaged),
    __param(1, ioc_1.Unmanaged),
    __param(2, ioc_1.Unmanaged),
    __param(3, ioc_1.Unmanaged),
    __metadata("design:paramtypes", [events_1.EventEmitter,
        mongodb_1.MongoClient,
        mongodb_1.Db, String])
], EventSource);
