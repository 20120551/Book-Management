import { IQuery } from "../../Queries";
export default interface IQueryDispatcher {
    ExecuteAsync<TResult>(query: IQuery<TResult>): Promise<TResult | null>;
}
