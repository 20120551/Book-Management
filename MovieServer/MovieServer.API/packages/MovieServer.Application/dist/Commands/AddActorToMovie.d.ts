import { ICommand } from "@movie/shared";
export default class AddActorToMovie implements ICommand {
    Id: string;
    Name: string;
    Role: string;
    /**
     *
     */
    constructor(Id: string, Name: string, Role: string);
}
