"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AggregationRoot = void 0;
const nanoid_1 = require("nanoid");
class AggregationRoot {
    guid;
    version = -1;
    events = [];
    constructor(guid) {
        this.guid = guid || (0, nanoid_1.nanoid)();
    }
    clearEvent() {
        this.events = [];
    }
    loadEvent(events) {
        events.forEach(event => {
            this.applyEvent(event);
            this.version++;
        });
    }
    applyEvent(event) {
        this[`apply${event.eventName}`] = event;
        this.events.push(event);
    }
    getUncommitedEvent() {
        return this.events;
    }
}
exports.AggregationRoot = AggregationRoot;
