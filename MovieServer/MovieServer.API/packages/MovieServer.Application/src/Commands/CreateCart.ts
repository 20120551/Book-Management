import { AutoMaping } from '@movie/shared';
import { ICommand } from "@movie/shared";
import { v4 as uuidv4 } from 'uuid';

export default class CreateCart implements ICommand {
    @AutoMaping
    public Id: string = uuidv4();
    // data for create movie
}