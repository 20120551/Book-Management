/*
    with IConsumer Interface design with handler as a generic callback, it mean
    each queue just be handled by one handler
    if you want to handle 1 queue with multiple handlers you will choose another way to
    archieve that
*/

import { IQuery } from "../Queries";

export default interface IConsumer {
    Subscribe<THandler extends IQuery<void>>(
        exchange: string,
        type: string,
        bindingKey: string,
        handler: (message: THandler) => Promise<void>): Promise<void>;
}