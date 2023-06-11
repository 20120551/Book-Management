export default interface ICacheService {
    //get
    Get<TSet>(key: string): Promise<TSet | null>;
    //set
    Set<TSet>(key: string, data: TSet, ttl: number): Promise<any>;
    //remove
    Remove(key: string): Promise<any>;
}