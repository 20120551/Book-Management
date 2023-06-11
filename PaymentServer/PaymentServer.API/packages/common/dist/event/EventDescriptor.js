"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDescriptor = void 0;
class EventDescriptor {
    eventName;
    aggregationId;
    aggregationName;
    version;
    payload;
    constructor(eventName, aggregationId, aggregationName, version, payload) {
        this.eventName = eventName;
        this.aggregationId = aggregationId;
        this.aggregationName = aggregationName;
        this.version = version;
        this.payload = payload;
    }
    static createEvent(event) {
        return {
            aggregationId: event.aggregationId,
            eventName: event.eventName,
            version: event.version,
            aggregationName: event.aggregationName,
            ...event.payload
        };
    }
    static create(event) {
        const { aggregationId, aggregationName, version, eventName, ...payload } = event;
        return new EventDescriptor(eventName, aggregationId, aggregationName, version || -1, payload);
    }
}
exports.EventDescriptor = EventDescriptor;
