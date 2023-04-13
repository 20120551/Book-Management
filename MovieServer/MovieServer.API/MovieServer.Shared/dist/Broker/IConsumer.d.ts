import { IQuery } from "@Shared/Queries";
export default interface IConsumer {
    Subscribe<THandler extends IQuery<void>>(exchange: string, type: string, bindingKey: string, handler: (message: THandler) => Promise<void>): Promise<void>;
}
