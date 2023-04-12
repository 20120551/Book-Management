export default class Localization {
    //method for validate
    /**
     * constructor
     */
    constructor(
        public District: string,
        public City: string,
    ) {

    }

    // implicit
    public static Create(district: string, city: string): Localization {
        return new Localization(district, city);
    }
}