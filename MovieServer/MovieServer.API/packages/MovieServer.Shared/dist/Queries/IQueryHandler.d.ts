import IQuery from "./IQuery";
export default interface IQueryHandler<TQuery extends IQuery<TResult>, TResult> {
    HandleAsync(query: TQuery): Promise<TResult | null>;
}
