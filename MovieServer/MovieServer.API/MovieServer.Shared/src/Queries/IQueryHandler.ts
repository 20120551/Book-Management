import { IQuery } from "@Shared/Queries";
// TQuery is the parameter of handle method
// TResult is the result type of handle method
export default interface IQueryHandler<TQuery extends IQuery<TResult>, TResult> {
    HandleAsync(query: TQuery): Promise<TResult | null>;
}