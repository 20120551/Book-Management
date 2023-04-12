/*
    with IConsumer Interface design with handler as a generic callback, it mean
    each queue just be handled by one handler
    if you want to handle 1 queue with multiple handlers you will choose another way to
    archieve that
*/

export default interface IConsumer {
    Subscribe<THandler>(
        exchange: string,
        type: string,
        bindingKey: string,
        handler: (data: THandler) => Promise<void | null>): Promise<void>;
}