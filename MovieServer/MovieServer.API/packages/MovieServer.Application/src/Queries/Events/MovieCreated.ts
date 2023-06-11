import { Localization } from "../../Utils";
import { IQuery } from "@movie/shared";

export default class MovieCreated implements IQuery<void>{
    constructor(
        public Id: string,
        public Name: string,
        public Status: string,
        public Slot: number,
        public Price: number,
        public Localization: Localization
    ) {
    }
}