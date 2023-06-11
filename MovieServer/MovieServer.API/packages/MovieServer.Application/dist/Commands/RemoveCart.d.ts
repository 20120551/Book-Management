import { ICommand } from '@movie/shared';
export default class RemoveCart implements ICommand {
    Id: string;
    constructor(id: string);
}
