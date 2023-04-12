export default interface IConsumer {
    Subscribe<THandler>(exchange: string, type: string, bindingKey: string, handler: (data: THandler) => Promise<void | null>): Promise<void>;
}
