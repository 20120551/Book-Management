"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Localization {
    //method for validate
    /**
     * constructor
     */
    constructor(District, City) {
        this.District = District;
        this.City = City;
    }
    // implicit
    static Create(district, city) {
        return new Localization(district, city);
    }
}
exports.default = Localization;
