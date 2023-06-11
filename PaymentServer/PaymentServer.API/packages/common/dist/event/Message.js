"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    id;
    exchange;
    data;
    status = false;
    constructor(id, exchange, data) {
        this.id = id;
        this.exchange = exchange;
        this.data = data;
    }
    markAsRead() {
        this.status = true;
    }
    static create(id, exchange, data) {
        return new Message(id, exchange, data);
    }
}
exports.Message = Message;
