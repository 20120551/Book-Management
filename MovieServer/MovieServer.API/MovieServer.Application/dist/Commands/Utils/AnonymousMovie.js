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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AutoMapper_1 = require("@Shared/AutoMapper");
const Localization_1 = __importDefault(require("./Localization"));
class AnonymousMovie {
    // data for create movie
    constructor(id, name, status, slot, price, localization, actors) {
        this.Id = id;
        this.Name = name;
        this.Status = status;
        this.Slot = slot;
        this.Price = price;
        this.Localization = localization;
        this.Actors = actors;
    }
}
__decorate([
    AutoMapper_1.AutoMaping,
    __metadata("design:type", String)
], AnonymousMovie.prototype, "Id", void 0);
__decorate([
    AutoMapper_1.AutoMaping,
    __metadata("design:type", String)
], AnonymousMovie.prototype, "Name", void 0);
__decorate([
    AutoMapper_1.AutoMaping,
    __metadata("design:type", String)
], AnonymousMovie.prototype, "Status", void 0);
__decorate([
    AutoMapper_1.AutoMaping,
    __metadata("design:type", Number)
], AnonymousMovie.prototype, "Slot", void 0);
__decorate([
    AutoMapper_1.AutoMaping,
    __metadata("design:type", Number)
], AnonymousMovie.prototype, "Price", void 0);
__decorate([
    AutoMapper_1.AutoMaping,
    __metadata("design:type", Localization_1.default)
], AnonymousMovie.prototype, "Localization", void 0);
__decorate([
    AutoMapper_1.AutoMaping,
    __metadata("design:type", Array)
], AnonymousMovie.prototype, "Actors", void 0);
exports.default = AnonymousMovie;
