"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aggregation {
    constructor() {
        this.Version = 0;
        this._events = [];
        this.Events = this._events;
    }
    AddEvent(event) {
        this._events.push(event);
    }
    CreateEvent() {
        this._events = [];
    }
}
exports.default = Aggregation;
