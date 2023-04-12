export default interface IPublisher {
    Publish<TRequest>(
        exchange: string,
        type: string,
        routingKey: string,
        data: TRequest,
        options?: Object): Promise<void>;
}