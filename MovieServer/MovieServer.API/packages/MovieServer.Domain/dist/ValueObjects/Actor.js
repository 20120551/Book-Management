"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Exceptions_1 = require("../Exceptions");
class Actor {
    /**
     * constructor
     */
    constructor(Name, Role) {
        this.Name = Name;
        this.Role = Role;
        if (Name === "") {
            throw new Exceptions_1.EmptyActorNameException();
        }
    }
    // implicit
    static Create(name, role) {
        return new Actor(name, role);
    }
}
exports.default = Actor;
