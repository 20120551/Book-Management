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
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("@movie/shared");
const Utils_1 = require("../Utils");
const uuid_1 = require("uuid");
class CreateMovie {
    // data for create movie
    constructor(name, status, slot, price, localization) {
        this.Id = (0, uuid_1.v4)();
        this.Name = name;
        this.Status = status;
        this.Slot = slot;
        this.Price = price;
        this.Localization = localization;
    }
}
__decorate([
    shared_1.AutoMaping,
    __metadata("design:type", String)
], CreateMovie.prototype, "Id", void 0);
__decorate([
    shared_1.AutoMaping,
    __metadata("design:type", String)
], CreateMovie.prototype, "Name", void 0);
__decorate([
    shared_1.AutoMaping,
    __metadata("design:type", String)
], CreateMovie.prototype, "Status", void 0);
__decorate([
    shared_1.AutoMaping,
    __metadata("design:type", Number)
], CreateMovie.prototype, "Slot", void 0);
__decorate([
    shared_1.AutoMaping,
    __metadata("design:type", Number)
], CreateMovie.prototype, "Price", void 0);
__decorate([
    shared_1.AutoMaping,
    __metadata("design:type", Utils_1.Localization)
], CreateMovie.prototype, "Localization", void 0);
exports.default = CreateMovie;
