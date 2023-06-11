import { ICommand } from '@movie/shared';
export default class RemoveMovie implements ICommand {
    Id: string;
    constructor(id: string);
}
