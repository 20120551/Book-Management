import { IQuery } from "@Shared/Queries";
export default interface IQueryHandler<TQuery extends IQuery<TResult>, TResult> {
    HandleAsync(query: TQuery): Promise<TResult | null>;
}
