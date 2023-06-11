export default class Localization {
    District: string;
    City: string;
    /**
     * constructor
     */
    constructor(District: string, City: string);
    static Create(district: string, city: string): Localization;
}
